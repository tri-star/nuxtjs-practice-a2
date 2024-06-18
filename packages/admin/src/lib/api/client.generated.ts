import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const postAdminauthlogin_Body = z
  .object({ loginId: z.string(), password: z.string() })
  .passthrough()
  .readonly();
const postAdminadminUsers_Body = z
  .object({
    name: z.string(),
    loginId: z.string(),
    password: z.string().min(8).max(100),
  })
  .passthrough()
  .readonly();
const putAdminadminUsersId_Body = z
  .object({ name: z.string(), loginId: z.string() })
  .passthrough()
  .readonly();
const postAdmincompanies_Body = z
  .object({
    name: z.string(),
    postalCode: z.string(),
    prefecture: z.string(),
    address1: z.string(),
    address2: z.string(),
    address3: z.string().optional(),
    phone: z.string(),
    canUseFeatureA: z.boolean().optional().default(false),
    canUseFeatureB: z.boolean().optional().default(false),
    canUseFeatureC: z.boolean().optional().default(false),
  })
  .passthrough()
  .readonly();
const postAdminusers_Body = z
  .object({
    name: z.string(),
    loginId: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(100),
  })
  .passthrough()
  .readonly();
const putAdminusersId_Body = z
  .object({ name: z.string(), loginId: z.string(), email: z.string().email() })
  .passthrough()
  .readonly();
const postAdmintasks_Body = z
  .object({
    companyId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "HOLD", "DONE"]),
    reasonCode: z
      .enum(["POSTPONED", "INVALID", "DUPLICATED", "DONE"])
      .optional(),
    createdUserId: z.string(),
  })
  .passthrough()
  .readonly();
const putAdmintasksId_Body = z
  .object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "HOLD", "DONE"]),
    reasonCode: z
      .enum(["POSTPONED", "INVALID", "DUPLICATED", "DONE"])
      .optional(),
  })
  .passthrough()
  .readonly();

export const schemas = {
  postAdminauthlogin_Body,
  postAdminadminUsers_Body,
  putAdminadminUsersId_Body,
  postAdmincompanies_Body,
  postAdminusers_Body,
  putAdminusersId_Body,
  postAdmintasks_Body,
  putAdmintasksId_Body,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/admin/admin-users",
    alias: "postAdminadminUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdminadminUsers_Body,
      },
    ],
    response: z
      .object({
        id: z.string(),
        name: z.string(),
        loginId: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/admin-users",
    alias: "getAdminadminUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "loginId",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z
      .object({
        success: z.boolean(),
        data: z
          .array(
            z
              .object({
                id: z.string(),
                name: z.string(),
                loginId: z.string(),
                createdAt: z.string().optional(),
                updatedAt: z.string().optional(),
              })
              .passthrough()
              .readonly()
          )
          .readonly(),
        count: z.number(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/admin-users/:id",
    alias: "getAdminadminUsersId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z
      .object({
        id: z.string(),
        name: z.string(),
        loginId: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "put",
    path: "/admin/admin-users/:id",
    alias: "putAdminadminUsersId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: putAdminadminUsersId_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/admin/admin-users/:id",
    alias: "deleteAdminadminUsersId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/admin/auth/login",
    alias: "postAdminauthlogin",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdminauthlogin_Body,
      },
    ],
    response: z.object({ token: z.string() }).passthrough().readonly(),
  },
  {
    method: "get",
    path: "/admin/auth/validate-login-id",
    alias: "getAdminauthvalidateLoginId",
    requestFormat: "json",
    parameters: [
      {
        name: "loginId",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: z.object({ valid: z.boolean() }).passthrough().readonly(),
  },
  {
    method: "post",
    path: "/admin/companies",
    alias: "postAdmincompanies",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdmincompanies_Body,
      },
    ],
    response: z
      .object({
        name: z.string(),
        postalCode: z.string(),
        prefecture: z.string(),
        address1: z.string(),
        address2: z.string(),
        address3: z.string().optional(),
        phone: z.string(),
        canUseFeatureA: z.boolean().optional().default(false),
        canUseFeatureB: z.boolean().optional().default(false),
        canUseFeatureC: z.boolean().optional().default(false),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/companies",
    alias: "getAdmincompanies",
    requestFormat: "json",
    parameters: [
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z
      .object({
        success: z.boolean(),
        data: z
          .array(
            z
              .object({
                id: z.string(),
                name: z.string(),
                postalCode: z.string(),
                prefecture: z.string(),
                address1: z.string(),
                address2: z.string(),
                address3: z.string().optional(),
                phone: z.string(),
                canUseFeatureA: z.boolean().optional().default(false),
                canUseFeatureB: z.boolean().optional().default(false),
                canUseFeatureC: z.boolean().optional().default(false),
                createdAt: z.string().optional(),
                updatedAt: z.string().optional(),
              })
              .passthrough()
              .readonly()
          )
          .readonly(),
        count: z.number(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/companies/:id",
    alias: "getAdmincompaniesId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z
      .object({
        id: z.string(),
        name: z.string(),
        postalCode: z.string(),
        prefecture: z.string(),
        address1: z.string(),
        address2: z.string(),
        address3: z.string().optional(),
        phone: z.string(),
        canUseFeatureA: z.boolean().optional().default(false),
        canUseFeatureB: z.boolean().optional().default(false),
        canUseFeatureC: z.boolean().optional().default(false),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "put",
    path: "/admin/companies/:id",
    alias: "putAdmincompaniesId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdmincompanies_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/admin/companies/:id",
    alias: "deleteAdmincompaniesId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/admin/tasks",
    alias: "postAdmintasks",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdmintasks_Body,
      },
    ],
    response: z
      .object({
        companyId: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "HOLD", "DONE"]),
        reasonCode: z
          .enum(["POSTPONED", "INVALID", "DUPLICATED", "DONE"])
          .optional(),
        createdUserId: z.string(),
        taskId: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/admin/tasks",
    alias: "getAdmintasks",
    requestFormat: "json",
    parameters: [
      {
        name: "keyword",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z
      .object({
        success: z.boolean(),
        data: z
          .array(
            z
              .object({
                id: z.string(),
                companyId: z.string(),
                title: z.string(),
                description: z.string(),
                status: z.enum([
                  "BACKLOG",
                  "TODO",
                  "IN_PROGRESS",
                  "HOLD",
                  "DONE",
                ]),
                reasonCode: z
                  .enum(["POSTPONED", "INVALID", "DUPLICATED", "DONE"])
                  .optional(),
                createdUserId: z.string(),
                createdAt: z.string().optional(),
                updatedAt: z.string().optional(),
              })
              .passthrough()
              .readonly()
          )
          .readonly(),
        count: z.number(),
      })
      .passthrough()
      .readonly(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/admin/tasks/:id",
    alias: "getAdmintasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z
      .object({
        id: z.string(),
        companyId: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "HOLD", "DONE"]),
        reasonCode: z
          .enum(["POSTPONED", "INVALID", "DUPLICATED", "DONE"])
          .optional(),
        createdUserId: z.string(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "put",
    path: "/admin/tasks/:id",
    alias: "putAdmintasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: putAdmintasksId_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request parameters`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/admin/tasks/:id",
    alias: "deleteAdmintasksId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/admin/users",
    alias: "postAdminusers",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: postAdminusers_Body,
      },
    ],
    response: z
      .object({
        id: z.string(),
        name: z.string(),
        loginId: z.string(),
        email: z.string().email(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/users",
    alias: "getAdminusers",
    requestFormat: "json",
    parameters: [
      {
        name: "loginId",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().optional(),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .array(
            z
              .object({
                id: z.string(),
                name: z.string(),
                loginId: z.string(),
                email: z.string().email(),
                createdAt: z.string().optional(),
                updatedAt: z.string().optional(),
              })
              .passthrough()
              .readonly()
          )
          .readonly(),
        count: z.number(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "get",
    path: "/admin/users/:id",
    alias: "getAdminusersId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z
      .object({
        id: z.string(),
        name: z.string(),
        loginId: z.string(),
        email: z.string().email(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })
      .passthrough()
      .readonly(),
  },
  {
    method: "put",
    path: "/admin/users/:id",
    alias: "putAdminusersId",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: putAdminusersId_Body,
      },
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/admin/users/:id",
    alias: "deleteAdminusersId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
