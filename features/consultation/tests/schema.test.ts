import {
  consultationFormSchema,
  type ConsultationFormValues,
} from "@/features/consultation/schema";
import { REGEX } from "@/shared/helper/regex";

describe("consultationFormSchema", () => {
  const validData: ConsultationFormValues = {
    name: "Vikram Verma",
    phone: "9876543210",
    email: "vikram@example.com",
    location: "Bilaspur",
    service: "Interior Design",
    budget: "₹25L – ₹50L",
    message: "Looking for modern interior design",
  };

  it("should validate correct data", () => {
    const result = consultationFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("name field", () => {
    it("should reject empty name", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        name: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject name with numbers", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        name: "Vikram123",
      });
      expect(result.success).toBe(false);
    });

    it("should accept name with hyphens", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        name: "Vikram-Verma",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("phone field", () => {
    it("should reject invalid phone", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        phone: "12345",
      });
      expect(result.success).toBe(false);
    });

    it("should reject phone starting with 0-5", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        phone: "5876543210",
      });
      expect(result.success).toBe(false);
    });

    it("should accept valid Indian mobile", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        phone: "9876543210",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("email field", () => {
    it("should accept empty email", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        email: "",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("location field", () => {
    it("should reject empty location", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        location: "",
      });
      expect(result.success).toBe(false);
    });

    it("should accept location with spaces", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        location: "New Delhi",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("service field", () => {
    it("should reject invalid service", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        service: "Invalid Service",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("budget field", () => {
    it("should reject invalid budget", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        budget: "Unknown",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("message field", () => {
    it("should accept empty message", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        message: "",
      });
      expect(result.success).toBe(true);
    });

    it("should accept optional message", () => {
      const result = consultationFormSchema.safeParse({
        ...validData,
        message: undefined,
      });
      expect(result.success).toBe(true);
    });
  });
});

describe("REGEX patterns", () => {
  it("should validate Indian mobile numbers", () => {
    expect(REGEX.mobileNumber.pattern.test("9876543210")).toBe(true);
    expect(REGEX.mobileNumber.pattern.test("6987654321")).toBe(true);
    expect(REGEX.mobileNumber.pattern.test("1234567890")).toBe(false);
    expect(REGEX.mobileNumber.pattern.test("987654321")).toBe(false);
  });

  it("should validate email addresses", () => {
    expect(REGEX.email.pattern.test("test@example.com")).toBe(true);
    expect(REGEX.email.pattern.test("invalid")).toBe(false);
    expect(REGEX.email.pattern.test("@no-local.com")).toBe(false);
  });

  it("should validate alphabetic names with hyphens", () => {
    expect(REGEX.alphabeticNameWithHyphen.pattern.test("Vikram")).toBe(true);
    expect(REGEX.alphabeticNameWithHyphen.pattern.test("Vikram-Verma")).toBe(
      true,
    );
    expect(REGEX.alphabeticNameWithHyphen.pattern.test("Vikram123")).toBe(
      false,
    );
  });
});
