import { IOClients } from "@vtex/api";

import { InfoClient } from "./infoclient";

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
	public get infoclient() {
		return this.getOrSet("infoclient", InfoClient);
	}
}
