import type { NextFunction, Response } from "express";
import { sendSuccess } from "../utils/http.js";
import { getProfileByUserId, updateProfile } from "../services/profileService.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export async function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const profile = await getProfileByUserId(userId);
    return sendSuccess(res, profile ?? null);
  } catch (error) {
    return next(error);
  }
}

export async function updateProfileController(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const payload = req.body ?? {};

    if (!userId) {
      throw Object.assign(new Error("Authenticated user is required."), { statusCode: 401, code: "UNAUTHORIZED" });
    }

    const incoming = payload as {
      name?: string;
      email?: string;
      college?: string;
      course?: string;
      semester?: number;
      section?: string;
      profile_image?: string | null;
    };

    if (incoming.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(incoming.email)) {
      throw Object.assign(new Error("Email must be a valid email address."), { statusCode: 400, code: "VALIDATION_ERROR" });
    }

    const profile = await updateProfile(userId, {
      name: incoming.name,
      email: incoming.email,
      college: incoming.college,
      course: incoming.course,
      semester: incoming.semester,
      section: incoming.section,
      profile_image: incoming.profile_image,
    });

    return sendSuccess(res, profile);
  } catch (error) {
    return next(error);
  }
}
