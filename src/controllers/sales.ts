import {
  Request,
  Response,
} from "express";

import {
  catchAsyncErrors,
} from "../middlewares/error";

import {
  sendSuccessResponse,
} from "../middlewares/success";

import {
  getAllSales,
  createSale,
  deleteSale,
} from "../services/sales";

export const getAll =
  catchAsyncErrors(
    async (
      req: Request,
      res: Response
    ) => {
      const page = req.query.page
        ? Number(req.query.page)
        : 1;

      const limit = req.query.limit
        ? Number(req.query.limit)
        : 10;

      const result =
        await getAllSales({
          page,
          limit,
        });

      sendSuccessResponse(
        res,
        200,
        "Sales fetched successfully",
        result
      );
    }
  );

export const create =
  catchAsyncErrors(
    async (
      req: Request,
      res: Response
    ) => {
      const productVariantId =
        String(
          req.body.productVariantId
        );

      const quantity = Number(
        req.body.quantity
      );

      const sale =
        await createSale({
          productVariantId,
          quantity,
        });

      sendSuccessResponse(
        res,
        201,
        "Sale created successfully",
        sale
      );
    }
  );

export const remove =
  catchAsyncErrors(
    async (
      req: Request,
      res: Response
    ) => {
      const id = String(
        req.params.id
      );

      const data =
        await deleteSale(id);

      sendSuccessResponse(
        res,
        200,
        "Sale deleted successfully",
        data
      );
    }
  );