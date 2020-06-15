import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	route = '/user';

	constructor(
		private httpClient: HttpClient
	) { }
	
	getUser(keyword, pageIndex = 1) {
		return this.httpClient.get(this.route, {
			params: {
				keyword: keyword,
				page: pageIndex.toString()
			},
			observe: "body"
		});
	}
}