import { Request } from "express";

export interface IGetIpInfoRequest extends Request {
  ipInfo?: IpInfo
}

export interface IpInfo {
	ip?: string,
	range?: number[],
	country?: string,
	region?: string,
	eu?: string,
	timezone?: string,
	city?: string,
	ll?: number[],
	metro?: number,
	area?: number
}
