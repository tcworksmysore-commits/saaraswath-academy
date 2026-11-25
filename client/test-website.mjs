import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as babelParser from '@babel/parser';
import _traverse from '@babel/traverse';
const traverse = _traverse.default || _traverse;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    failedTests++;
    failures.push({ testName, details });
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
  }
}

console.log('\n========================================');
console.log('🚀 SAARASWATH ACADEMY COMPREHENSIVE TEST SUITE');
console.log('========================================\n');

// ----------------------------------------------------
// SECTION 1: Syntax & AST Parsing for Every File
// ----------------------------------------------------
console.log('📦 1. Testing Code Syntax & AST Parsing on All Source Files...');

function getAllFiles(dir, exts = ['.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const allSrcFiles = getAllFiles(srcDir);
const fileASTs = new Map();
const fileExports = new Map();

for (const filePath of allSrcFiles) {
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties', 'objectRestSpread']
    });
    fileASTs.set(filePath, ast);

    // Collect exports
    const exports = new Set();
    for (const node of ast.program.body) {
      if (node.type === 'ExportDefaultDeclaration') {
        exports.add('default');
      } else if (node.type === 'ExportNamedDeclaration') {
        if (node.declaration) {
          if (node.declaration.declarations) {
            for (const d of node.declaration.declarations) {
              if (d.id && d.id.name) exports.add(d.id.name);
            }
          } else if (node.declaration.id && node.declaration.id.name) {
            exports.add(node.declaration.id.name);
          }
        }
        if (node.specifiers) {
          for (const s of node.specifiers) {
            if (s.exported && s.exported.name) exports.add(s.exported.name);
          }
        }
      }
    }
    fileExports.set(filePath, exports);

    assert(true, `Syntax Valid: ${relPath}`);
  } catch (err) {
    assert(false, `Syntax Valid: ${relPath}`, err.message);
  }
}

// ----------------------------------------------------
// SECTION 2: Import & Module Resolution Verification
// ----------------------------------------------------
console.log('\n🔗 2. Testing Module Import Resolutions & Named Exports...');

const standardGlobals = new Set([
  'window', 'document', 'navigator', 'localStorage', 'sessionStorage',
  'console', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval',
  'fetch', 'FormData', 'URLSearchParams', 'encodeURIComponent', 'decodeURIComponent',
  'Date', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean', 'RegExp',
  'Error', 'TypeError', 'Promise', 'Set', 'Map', 'Intl', 'parseInt', 'parseFloat',
  'isNaN', 'isFinite', 'import', 'undefined', 'null', 'Infinity', 'NaN'
]);

for (const [filePath, ast] of fileASTs.entries()) {
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const fileDir = path.dirname(filePath);

  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      const importSource = node.source.value;

      // Handle relative imports
      if (importSource.startsWith('.')) {
        let resolvedPath = path.resolve(fileDir, importSource);
        let found = false;

        const candidates = [
          resolvedPath,
          resolvedPath + '.js',
          resolvedPath + '.jsx',
          resolvedPath + '.css',
          path.join(resolvedPath, 'index.js'),
          path.join(resolvedPath, 'index.jsx')
        ];

        let actualPath = null;
        for (const c of candidates) {
          if (fs.existsSync(c) && fs.statSync(c).isFile()) {
            found = true;
            actualPath = c;
            break;
          }
        }

        assert(found, `Import Exists: ${relPath} -> ${importSource}`, `Target file not found for ${importSource}`);

        // If target file is one of our parsed files, verify named imports
        if (actualPath && fileExports.has(actualPath)) {
          const targetExports = fileExports.get(actualPath);
          for (const spec of node.specifiers) {
            if (spec.type === 'ImportDefaultSpecifier') {
              assert(targetExports.has('default'), `Default Export Exists: ${relPath} imports default from ${importSource}`);
            } else if (spec.type === 'ImportSpecifier') {
              const importedName = spec.imported.name;
              assert(targetExports.has(importedName), `Named Export Exists: "${importedName}" in ${importSource} imported by ${relPath}`);
            }
          }
        }
      }
    }
  }
}

// ----------------------------------------------------
// SECTION 3: AST Undefined Variable Check
// ----------------------------------------------------
console.log('\n🔍 3. Testing for Undeclared Variables in Components...');

for (const [filePath, ast] of fileASTs.entries()) {
  const relPath = path.relative(__dirname, filePath).replace(/\\/g, '/');
  const undeclared = [];

  traverse(ast, {
    Program(pathTraverse) {
      // Collect scope bindings
    },
    Identifier(pathTraverse) {
      const name = pathTraverse.node.name;
      // Skip properties, keys, declaration identifiers, import specifiers, optional members, meta properties
      if (
        (pathTraverse.parent.type === 'MemberExpression' || pathTraverse.parent.type === 'OptionalMemberExpression') &&
        pathTraverse.parent.property === pathTraverse.node &&
        !pathTraverse.parent.computed
      ) {
        return;
      }
      if (pathTraverse.parent.type === 'MetaProperty') {
        return;
      }
      if (
        pathTraverse.parent.type === 'ObjectProperty' &&
        pathTraverse.parent.key === pathTraverse.node &&
        !pathTraverse.parent.computed
      ) {
        return;
      }
      if (
        pathTraverse.parent.type === 'ImportSpecifier' ||
        pathTraverse.parent.type === 'ImportDefaultSpecifier' ||
        pathTraverse.parent.type === 'ExportSpecifier'
      ) {
        return;
      }
      if (
        pathTraverse.parent.type === 'JSXAttribute' &&
        pathTraverse.parent.name === pathTraverse.node
      ) {
        return;
      }

      if (
        !pathTraverse.scope.hasBinding(name) &&
        !standardGlobals.has(name)
      ) {
        // Check if it's React or JSX related or global JSX namespace
        if (['React', 'Fragment', 'props'].includes(name)) return;
        undeclared.push({ name, loc: pathTraverse.node.loc?.start });
      }
    }
  });

  const isClean = undeclared.length === 0;
  assert(
    isClean,
    `Scope Check: ${relPath}`,
    undeclared.map(u => `${u.name} (line ${u.loc?.line})`).join(', ')
  );
}

// ----------------------------------------------------
// SECTION 4: Unit Testing utils/validators.js
// ----------------------------------------------------
console.log('\n🧪 4. Testing Form & Input Validation Logic (validators.js)...');

const { isValidEmail, isValidPhone, validateEnquiryForm, validateContactForm } = await import('./src/utils/validators.js');

// Test isValidEmail
assert(isValidEmail('student@example.com') === true, 'isValidEmail: valid student@example.com');
assert(isValidEmail('ramesh.gowda@gmail.com') === true, 'isValidEmail: valid ramesh.gowda@gmail.com');
assert(isValidEmail('test.name+tag@sub.domain.org') === true, 'isValidEmail: valid with subdomains');
assert(isValidEmail('') === false, 'isValidEmail: empty string is false');
assert(isValidEmail(null) === false, 'isValidEmail: null is false');
assert(isValidEmail(undefined) === false, 'isValidEmail: undefined is false');
assert(isValidEmail('invalid-email') === false, 'isValidEmail: no @ symbol is false');
assert(isValidEmail('invalid@') === false, 'isValidEmail: missing domain is false');
assert(isValidEmail('@example.com') === false, 'isValidEmail: missing username is false');
assert(isValidEmail('test@com') === false, 'isValidEmail: TLD < 2 chars is false');
assert(isValidEmail('test @example.com') === false, 'isValidEmail: space in email is false');

// Test isValidPhone
assert(isValidPhone('9845123456') === true, 'isValidPhone: 10 digit starting with 9');
assert(isValidPhone('8765432109') === true, 'isValidPhone: 10 digit starting with 8');
assert(isValidPhone('7619415566') === true, 'isValidPhone: 10 digit starting with 7');
assert(isValidPhone('6361234567') === true, 'isValidPhone: 10 digit starting with 6');
assert(isValidPhone('+919845123456') === true, 'isValidPhone: strips +91 country prefix');
assert(isValidPhone('09845123456') === true, 'isValidPhone: strips leading 0');
assert(isValidPhone('98451-23456') === true, 'isValidPhone: strips hyphens');
assert(isValidPhone('9845 123 456') === true, 'isValidPhone: strips spaces');
assert(isValidPhone('5845123456') === false, 'isValidPhone: starts with 5 is invalid in India');
assert(isValidPhone('1234567890') === false, 'isValidPhone: starts with 1 is invalid in India');
assert(isValidPhone('984512345') === false, 'isValidPhone: 9 digits is invalid');
assert(isValidPhone('98451234567') === false, 'isValidPhone: 11 digits without 0 is invalid');
assert(isValidPhone('') === false, 'isValidPhone: empty string is false');
assert(isValidPhone(null) === false, 'isValidPhone: null is false');

// Test validateEnquiryForm
const emptyEnquiry = validateEnquiryForm({});
assert(emptyEnquiry.isValid === false, 'validateEnquiryForm: rejects empty object');
assert(!!emptyEnquiry.errors.name, 'validateEnquiryForm: flags missing name');
assert(!!emptyEnquiry.errors.phone, 'validateEnquiryForm: flags missing phone');
assert(!!emptyEnquiry.errors.courseInterested, 'validateEnquiryForm: flags missing course');
assert(!!emptyEnquiry.errors.consent, 'validateEnquiryForm: flags missing consent');

const shortNameEnquiry = validateEnquiryForm({
  name: 'Ab',
  phone: '9845123456',
  courseInterested: 'UPSC CSE',
  consent: true
});
assert(shortNameEnquiry.isValid === false, 'validateEnquiryForm: rejects short name < 3 chars');

const numberNameEnquiry = validateEnquiryForm({
  name: 'Ramesh123',
  phone: '9845123456',
  courseInterested: 'UPSC CSE',
  consent: true
});
assert(numberNameEnquiry.isValid === false, 'validateEnquiryForm: rejects numbers in name');

const validEnquiry = validateEnquiryForm({
  name: 'Suresh Kumar',
  phone: '9845123456',
  email: 'suresh@gmail.com',
  courseInterested: 'UPSC Civil Services Integrated',
  consent: true
});
assert(validEnquiry.isValid === true, 'validateEnquiryForm: accepts full valid payload');
assert(Object.keys(validEnquiry.errors).length === 0, 'validateEnquiryForm: zero errors on valid submission');

// Test validateContactForm
const emptyContact = validateContactForm({});
assert(emptyContact.isValid === false, 'validateContactForm: rejects empty object');
assert(!!emptyContact.errors.name, 'validateContactForm: flags missing name');
assert(!!emptyContact.errors.contact, 'validateContactForm: flags missing both phone and email');
assert(!!emptyContact.errors.message, 'validateContactForm: flags missing message');

const phoneOnlyContact = validateContactForm({
  name: 'Ananya Rao',
  phone: '9845123456',
  message: 'Hello, please send details about the weekend batch.'
});
assert(phoneOnlyContact.isValid === true, 'validateContactForm: valid with phone only');

const emailOnlyContact = validateContactForm({
  name: 'Ananya Rao',
  email: 'ananya@gmail.com',
  message: 'Hello, please send details about the weekend batch.'
});
assert(emailOnlyContact.isValid === true, 'validateContactForm: valid with email only');

const invalidPhoneContact = validateContactForm({
  name: 'Ananya Rao',
  phone: '12345',
  message: 'Hello, please send details about the weekend batch.'
});
assert(invalidPhoneContact.isValid === false, 'validateContactForm: rejects invalid phone');

// ----------------------------------------------------
// SECTION 5: Unit Testing utils/helpers.js
// ----------------------------------------------------
console.log('\n🛠️ 5. Testing Helper Utilities (helpers.js)...');

const { formatDate, truncate, getAssetUrl } = await import('./src/utils/helpers.js');

assert(formatDate('') === '', 'formatDate: handles empty string');
assert(formatDate(null) === '', 'formatDate: handles null');
const formatted = formatDate('2026-03-15');
assert(formatted.includes('2026') && formatted.includes('15'), `formatDate: formats ISO date (${formatted})`);

assert(truncate('') === '', 'truncate: handles empty string');
assert(truncate('Short text', 20) === 'Short text', 'truncate: does not truncate text below limit');
assert(truncate('This is a longer sentence that should get truncated', 10) === 'This is a ...', 'truncate: appends ellipsis');

assert(getAssetUrl('') === '', 'getAssetUrl: handles empty string');
assert(getAssetUrl('https://example.com/logo.png') === 'https://example.com/logo.png', 'getAssetUrl: keeps full https URL');
assert(getAssetUrl('http://example.com/logo.png') === 'http://example.com/logo.png', 'getAssetUrl: keeps full http URL');
assert(getAssetUrl('data:image/png;base64,xxx') === 'data:image/png;base64,xxx', 'getAssetUrl: keeps data URI');
const assetRes = getAssetUrl('/images/logo.png');
assert(assetRes.endsWith('images/logo.png'), `getAssetUrl: resolves relative path cleanly (${assetRes})`);

// ----------------------------------------------------
// SECTION 6: Unit Testing Service Layers
// ----------------------------------------------------
console.log('\n📦 6. Testing Data Services...');

// Course Service
const { courseService } = await import('./src/services/courseService.js');
const allCourses = await courseService.getAllCourses();
assert(Array.isArray(allCourses) && allCourses.length >= 5, `courseService.getAllCourses returns ${allCourses.length} courses`);
const firstCourse = await courseService.getCourseById(allCourses[0].id);
assert(firstCourse && firstCourse.id === allCourses[0].id, `courseService.getCourseById found: ${allCourses[0].title}`);
const missingCourse = await courseService.getCourseById('non-existent-course-id');
assert(missingCourse === null, 'courseService.getCourseById returns null for invalid id');

// Study Material Service
const { studyMaterialService } = await import('./src/services/studyMaterialService.js');
const publicMats = await studyMaterialService.getPublicMaterials();
assert(publicMats && Array.isArray(publicMats.materials) && publicMats.materials.length > 0, `studyMaterialService.getPublicMaterials: returns ${publicMats.materials.length} items`);

const filteredMats = await studyMaterialService.getPublicMaterials({ resourceType: 'Question Paper' });
assert(filteredMats.materials.every(m => m.resourceType === 'Question Paper'), 'studyMaterialService: filters correctly by resourceType');

const searchMats = await studyMaterialService.getPublicMaterials({ search: 'UPSC' });
assert(searchMats.materials.length > 0, 'studyMaterialService: filters correctly by search query');

const limitMats = await studyMaterialService.getPublicMaterials({ limit: 2 });
assert(limitMats.materials.length === 2, 'studyMaterialService: limits results correctly');

// Faculty Service
const { facultyService } = await import('./src/services/facultyService.js');
const allFaculty = await facultyService.getAllFaculty();
assert(Array.isArray(allFaculty) && allFaculty.length >= 5, `facultyService.getAllFaculty returns ${allFaculty.length} members`);
const fac1 = await facultyService.getFacultyById(allFaculty[0].id);
assert(fac1 && fac1.name === allFaculty[0].name, `facultyService.getFacultyById returns ${allFaculty[0].name}`);

// Achievement Service
const { achievementService } = await import('./src/services/achievementService.js');
const allAchievements = await achievementService.getAllAchievements();
assert(Array.isArray(allAchievements) && allAchievements.length >= 4, `achievementService.getAllAchievements returns ${allAchievements.length} achievers`);

// Gallery Service
const { galleryService } = await import('./src/services/galleryService.js');
const allImages = await galleryService.getAllImages();
assert(Array.isArray(allImages) && allImages.length >= 6, `galleryService.getAllImages returns ${allImages.length} images`);

// Mock localStorage for enquiryService
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

const { enquiryService } = await import('./src/services/enquiryService.js');
const submitResult = await enquiryService.submitEnquiry({
  name: 'Test Aspirant',
  phone: '9845123456',
  courseInterested: 'UPSC CSE'
});
assert(submitResult.success === true, 'enquiryService.submitEnquiry: successfully stores enquiry');

const storedEnquiries = await enquiryService.getAllEnquiries();
assert(storedEnquiries.total >= 1, `enquiryService.getAllEnquiries: retrieves stored items (${storedEnquiries.total})`);

const foundEnquiry = await enquiryService.getEnquiryById(submitResult.data.id);
assert(foundEnquiry && foundEnquiry.name === 'Test Aspirant', 'enquiryService.getEnquiryById: finds item');

const updateStatus = await enquiryService.updateEnquiryStatus(submitResult.data.id, 'Contacted');
assert(updateStatus.success === true, 'enquiryService.updateEnquiryStatus: updates successfully');

const deleteResult = await enquiryService.deleteEnquiry(submitResult.data.id);
assert(deleteResult.success === true, 'enquiryService.deleteEnquiry: deletes successfully');

// ----------------------------------------------------
// SECTION 7: Route & Navigation Consistency Check
// ----------------------------------------------------
console.log('\n🗺️ 7. Testing App Routes vs Navigation Links...');

const appCode = fs.readFileSync(path.join(srcDir, 'App.jsx'), 'utf-8');
const routeMatches = [...appCode.matchAll(/path="([^"]+)"/g)].map(m => m[1]);
const definedRoutes = new Set(routeMatches);
console.log(`  Discovered ${definedRoutes.size} routes in App.jsx:`, [...definedRoutes].join(', '));

function checkLinksInFile(filePath, expectedDefinedRoutes) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const linkMatches = [...content.matchAll(/to="([^"]+)"/g)].map(m => m[1]);
  const rel = path.relative(__dirname, filePath).replace(/\\/g, '/');

  for (const link of linkMatches) {
    if (link.startsWith('#') || link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:')) {
      continue;
    }
    const cleanPath = link.split('?')[0];

    // Check exact match or dynamic route match like /courses/:id
    let matchesRoute = expectedDefinedRoutes.has(cleanPath);
    if (!matchesRoute) {
      if (cleanPath.startsWith('/courses/')) {
        matchesRoute = expectedDefinedRoutes.has('/courses/:id');
      }
    }
    assert(matchesRoute, `Link Valid: "${link}" in ${rel}`, `No route defined for "${cleanPath}"`);
  }
}

checkLinksInFile(path.join(srcDir, 'components/layout/Navbar.jsx'), definedRoutes);
checkLinksInFile(path.join(srcDir, 'components/layout/MobileMenu.jsx'), definedRoutes);
checkLinksInFile(path.join(srcDir, 'components/layout/Footer.jsx'), definedRoutes);

// ----------------------------------------------------
// SECTION 8: Static Public Assets Verification
// ----------------------------------------------------
console.log('\n🖼️ 8. Testing Asset References Against Public Directory...');

const { ACADEMY_INFO: acInfo, INITIAL_COURSES: initCourses, INITIAL_FACULTY: initFac, INITIAL_ACHIEVERS: initAch, INITIAL_GALLERY: initGal } = await import('./src/utils/constants.js');

function verifyPublicAsset(assetPath, label) {
  if (!assetPath) return;
  // If it's a relative path in public
  let clean = assetPath;
  if (clean.startsWith('/')) clean = clean.slice(1);
  const full = path.join(publicDir, clean);
  const exists = fs.existsSync(full);
  assert(exists, `Asset Exists: ${label} -> ${clean}`);
}

verifyPublicAsset('images/logo/academy-logo-tight.png', 'Navbar tight logo');
verifyPublicAsset('images/logo/academy-logo.png', 'Official logo');
verifyPublicAsset('images/founder/dr-vasanth-kumar.jpg', 'Founder photo');
verifyPublicAsset('brochures/academy-brochure.pdf', 'Official brochure');

for (const fac of initFac) {
  verifyPublicAsset(fac.image, `Faculty image: ${fac.name}`);
}

for (const ach of initAch) {
  verifyPublicAsset(ach.photo, `Achiever photo: ${ach.name}`);
}

for (const gal of initGal) {
  verifyPublicAsset(gal.image, `Gallery photo: ${gal.title}`);
}

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log('\n========================================');
console.log(`📊 TEST SUITE SUMMARY:`);
console.log(`   Total Tests:  ${totalTests}`);
console.log(`   Passed:       ${passedTests}`);
console.log(`   Failed:       ${failedTests}`);
console.log('========================================\n');

if (failedTests > 0) {
  console.error('❌ FAILURES DETECTED:');
  for (const f of failures) {
    console.error(`- ${f.testName}: ${f.details}`);
  }
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED WITH ZERO ERRORS! 100% CLEAN CODEBASE.');
  process.exit(0);
}
