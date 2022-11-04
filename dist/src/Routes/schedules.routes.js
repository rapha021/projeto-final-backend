"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRoutes = void 0;
const express_1 = require("express");
const createSchedule_controller_1 = __importDefault(require("../Controllers/schedules/createSchedule.controller"));
const deleteSchedule_controller_1 = __importDefault(require("../Controllers/schedules/deleteSchedule.controller"));
const getAllSchedules_controller_1 = __importDefault(require("../Controllers/schedules/getAllSchedules.controller"));
const getSchedulesByUser_controller_1 = __importDefault(require("../Controllers/schedules/getSchedulesByUser.controller"));
const updateSchedule_controller_1 = __importDefault(require("../Controllers/schedules/updateSchedule.controller"));
const ensureAuth_middleware_1 = __importDefault(require("../Middlewares/ensureAuth.middleware"));
exports.scheduleRoutes = (0, express_1.Router)();
exports.scheduleRoutes.post("", ensureAuth_middleware_1.default, createSchedule_controller_1.default);
exports.scheduleRoutes.get("", ensureAuth_middleware_1.default, getAllSchedules_controller_1.default);
exports.scheduleRoutes.get(":userId", ensureAuth_middleware_1.default, getSchedulesByUser_controller_1.default);
exports.scheduleRoutes.get(":professionalId", ensureAuth_middleware_1.default, getSchedulesByUser_controller_1.default);
exports.scheduleRoutes.patch(":id", ensureAuth_middleware_1.default, updateSchedule_controller_1.default);
exports.scheduleRoutes.delete(":id", ensureAuth_middleware_1.default, deleteSchedule_controller_1.default);
