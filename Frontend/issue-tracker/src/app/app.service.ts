import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:3000/api/v1';
  private authToken: string = Cookie.get('authtoken');

  constructor(private _http: HttpClient) {
  }

  private handleError(err: HttpErrorResponse) {
    console.log("Handle error Http calls")
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  signup(data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/users/signup`, data);
    return response
  }

  login(data): Observable<any> {
    let myResponse = this._http.post(`${this.baseUrl}/users/login`, data)
    return myResponse;
  }// end login

  logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'));
    return this._http.post(`${this.baseUrl}/users/logout`, params);
  } // end logout function

  getUser(userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/users/${userId}/details?authToken=${this.authToken}`)
    return response
  }

  editUser(userId, data): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.put(`${this.baseUrl}/users/${userId}/edit?authToken=${this.authToken}`, data)
    return response
  }

  deleteUser(userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.post(`${this.baseUrl}/users/${userId}/delete?authToken=${this.authToken}`, '')
    return response
  }

  recoverPassword(data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/users/forgotPassword`, data)
    return response
  }

  resetPassword(data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/users/resetPassword`, data)
    return response
  }

  createIssue(data): Observable<any> {
    let resposne = this._http.post(`${this.baseUrl}/issues/create?authToken=${this.authToken}`, data)
    return resposne
  }

  getIssues(userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/issues/all/${userId}?authToken=${this.authToken}`)
    return response
  }

  getSingleIssue(issueId): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/issues/${issueId}/details?authToken=${this.authToken}`)
    return response
  }

  editIssue(issueId, data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/issues/${issueId}/edit?authToken=${this.authToken}`, data)
    return response
  }

  deleteIssue(projectId, issueId): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/issues/${issueId}/delete?authToken=${this.authToken}`, { projectId: projectId })
    return response
  }

  createComment(issueId, comment): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/issues/comment/${issueId}?authToken=${this.authToken}`, comment)
    return response
  }

  editComment(issueId, comment_id, body): Observable<any> {
    let comment = {
      comment_id: comment_id,
      body: body
    }
    let response = this._http.put(`${this.baseUrl}/issues/${issueId}/edit/comment?authToken=${this.authToken}`, comment)
    return response
  }

  deleteComment(issueId, commentId): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/issues/${issueId}/commentDelete?authToken=${this.authToken}`, { comment_id: commentId })
    return response
  }

  serachIssues(searchQuery): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/issues/search/${searchQuery}?authToken=${this.authToken}`)
    return response
  }

}
