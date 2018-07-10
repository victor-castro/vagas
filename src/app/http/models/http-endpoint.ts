import { environment } from '../../../environments/environment';

export class HttpEndpoint {
	protected _baseURI: string;
	protected _endpoint: string;

	constructor(endpoint: string) {
		this._endpoint = endpoint;
    	this.baseURI = environment.api.baseURI;

	}

	set baseURI(uri:string) {
		this._baseURI = uri;
	}

	get baseURI(): string {
		return this._baseURI;
	}

	get endpoint(): string {
		return this._endpoint;
	}

	get path(): string {
		return `${this.baseURI}/${this.endpoint}`
	}

}