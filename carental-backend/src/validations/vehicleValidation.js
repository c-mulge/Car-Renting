import { body } from "express-validator";

export const vehicleValidation = [
  body("name").notEmpty().withMessage("Vehicle name is required"),

  body("brand").notEmpty().withMessage("Brand is required"),

  body("model").notEmpty().withMessage("Model is required"),

  body("year")
    .isInt({
      min: 2000,
      max: 2035,
    })
    .withMessage("Invalid year"),

  body("pricePerKm")
    .isFloat({ min: 1 })
    .withMessage("Price per km must be greater than 0"),

  body("securityDeposit")
    .isFloat({ min: 0 })
    .withMessage("Invalid security deposit"),

  body("registrationNumber")
    .notEmpty()
    .withMessage("Registration number required"),
];
