import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { goodreadsKey } from '../keys.constant';
import { map } from 'rxjs/operators';
import * as xml2js from 'xml2js';
@Injectable()
export class AppService {
    constructor (private http: HttpClient) {
      // const parseString = require('xml2js').parseString;
      // console.log(xml2json);
      console.log(xml2js);
    }
    books: any;
    get(title: string) {
        return this.http.get(goodreadsKey.url, {
            params: {
                key: goodreadsKey.key,
                q: title
            },
            responseType: 'text'
        }).pipe(
            map( res => {
              xml2js.parseString(res, (err, result) => {
                this.books = result.GoodreadsResponse.search;

              } );
              return this.books;
            } )
          );
    }
}

