"use server";

import { TReport } from "@/lib/Types";
import { SV_HttpGet, TParamAPI, TRes } from "@/utils/Http";

export const getReport = async (params: TParamAPI): Promise<TRes<TReport[]>> => {
  try {
    const reports = await SV_HttpGet<TRes<TReport[]>>("/reports", params, ["reports", params.userCreated]);
    return reports;
  } catch (err) {
    throw err;
  }
};
