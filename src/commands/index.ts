import { Command } from "../types";
import ping from "./General/ping";
import kys from "./General/kys";
import request from "./General/request";

export default [
    ping,
    kys,
    request
] as Command[]