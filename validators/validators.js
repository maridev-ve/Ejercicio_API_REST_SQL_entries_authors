const { body, query } = require("express-validator");

const validateCreateAuthors = [
  body("name")
    .notEmpty()
    .withMessage("name of author is required")
    .bail()
    .isString()
    .withMessage("name should be string")
    .bail()
    .isLength({ min: 3, max: 45 })
    .withMessage("name should be at least 3 characters and max 45 characters"),
  body("surname")
    .exists()
    .withMessage("surname is required")
    .bail()
    .isString()
    .withMessage("surname should be string")
    .bail()
    .isLength({ min: 3, max: 45 })
    .withMessage("surname should be at least 3 characters and max 45 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email")
    .bail()
    .isLength({max: 100})
    .withMessage("The Email must not exceed 100 characters"),
];

const validateUpdateAuthors = [
  body("name")
    .notEmpty()
    .withMessage("new name of author is required")
    .bail()
    .isString()
    .withMessage("name should be string")
    .bail()
    .isLength({ min: 3, max: 45 })
    .withMessage("name should be at least 3 characters and max 45 characters"),
  body("surname")
    .exists()
    .withMessage("surname is required")
    .bail()
    .isString()
    .withMessage("surname should be string")
    .bail()
    .isLength({ min: 3, max: 45 })
    .withMessage("surname should be at least 3 characters and max 45 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email")
    .bail()
    .isLength({max: 100})
    .withMessage("The Email must not exceed 100 characters"),
  body("new_email")
    .exists()
    .withMessage("new email is required")
    .bail()
    .isEmail()
    .withMessage("The new email is invalid.")
    .bail()
    .isLength({max: 100})
    .withMessage("The New Email must not exceed 100 characters"),
  body("image")
    .exists()
    .withMessage("image is required")
    .bail()
    .isURL()
    .withMessage("The URL is invalid.")
    .bail()
    .isLength({ max: 255 })
    .withMessage("The URL must not exceed 255 characters"),
];

const validateCreateEntry = [
  body("title")
    .exists()
    .withMessage("Title of entry is required")
    .bail()// "si algo antes de este punto ha fallado, no sigas comprobando este campo"
    .isString()
    .withMessage("Title should be string")
    .bail()
    .isLength({min: 3, max: 100})
    .withMessage("The Title at least 3 characters and must not exceed 100 characters"),
  body("content")
    .exists()
    .withMessage("Content is required")
    .bail()
    .isString()
    .withMessage("Content should be string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Content should be at least 10 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .bail()
    .isString()
    .withMessage("Category should be string")
    .bail()
    .isLength({ min: 5, max: 15 })
    .withMessage("Category at least 5 characters and max 15 characters"),
];

const validateUpdateEntry = [
  body("title")
    .notEmpty()
    .withMessage("Title of entry is required")
    .bail()
    .isString()
    .withMessage("Title should be string")
    .bail()
    .isLength({min: 3, max: 100})
    .withMessage("The Title at least 3 characters and must not exceed 100 characters"),
  body("content")
    .exists()
    .withMessage("Content is required")
    .bail()
    .isString()
    .withMessage("Content should be string")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Content should be at least 10 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email"),
  body("new_title")
    .notEmpty()
    .withMessage("New Title of entry is required")
    .bail()
    .isString()
    .withMessage("The new Title should be string")
    .bail()
    .isLength({min: 3, max: 100})
    .withMessage("The New Title must not exceed 100 characters"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .bail()
    .isString()
    .withMessage("Category should be string")
    .bail()
    .isLength({ min: 5, max: 15 })
    .withMessage("Category at least 5 characters and max 15 characters"),
];

const validateGetByEmail = [
  query("email")
    .optional()
    .isEmail()
    .withMessage("email in query must be a valid email")
    .bail()
    .isLength({ max: 100 })
    .withMessage("The Email must not exceed 100 characters"),
];

const validateDeleteAuthor = [
  body("email")
    .isEmail()
    .withMessage("email is required and must be valid")
    .bail()
    .isLength({ max: 100 })
    .withMessage("The Email must not exceed 100 characters"),
];

const validateDeleteEntry = [
  body("title")
    .notEmpty()
    .withMessage("Title of entry is required")
    .bail()
    .isString()
    .withMessage("Title should be string")
    .bail()
    .isLength({ max: 100 })
    .withMessage("The Title must not exceed 100 characters"),
];

module.exports = {
  validateCreateAuthors,
  validateUpdateAuthors,
  validateCreateEntry,
  validateUpdateEntry,
  validateGetByEmail,
  validateDeleteAuthor,
  validateDeleteEntry
};