import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from "angularx-social-login";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com/api/v1';

  // private baseUrl = 'http://localhost:3000/api/v1';

  private authToken: string = Cookie.get('authtoken');

  constructor(private _http: HttpClient, private authService: AuthService, private router: Router) {
      if (!window.location.href.includes('login') && !Cookie.get('authtoken')) this.router.navigate(['home'])
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

  googleSignin(token): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/users/signin/google`, token);
    return response
  }

  fbSignin(data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/users/signin/fb`, data);
    return response
  }

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

  searchUsers(userId, searchQuery): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/users/search/${userId}/${searchQuery}?authToken=${this.authToken}`)
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

  createProject(data): Observable<any> {
    let resposne = this._http.post(`${this.baseUrl}/projects/create?authToken=${this.authToken}`, data)
    return resposne
  }

  getProject(id, fields?): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/projects/${id}/details?authToken=${this.authToken}&fields=${fields}`)
    return response
  }

  getAllProjects(userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/projects/all/${userId}?authToken=${this.authToken}`)
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

  getProjectIssues(projectId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/issues/project/${projectId}?authToken=${this.authToken}`)
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

  addIssueAttachment(issueId, files): Observable<any> {
    const fd = new FormData();
    for (let file of files) {
      fd.append('file', file, file.name);
    }
    let resposne = this._http.post(`${this.baseUrl}/issues/${issueId}/attachment?authToken=${this.authToken}`, fd, {
      reportProgress: true,
      observe: 'events'
    })
    return resposne
  }

  addProjectAttachment(projectId, files): Observable<any> {
    const fd = new FormData();
    for (let file of files) {
      fd.append('file', file, file.name);
    }
    let resposne = this._http.post(`${this.baseUrl}/projects/${projectId}/attachment?authToken=${this.authToken}`, fd, {
      reportProgress: true,
      observe: 'events'
    })
    return resposne
  }

  getIssueAttachments(issueId): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/issues/${issueId}/attachment/get?authToken=${this.authToken}`)
    return response
  }

  getIssueAttachmentDownloadLink(issueId, file): String {
    let link = `${this.baseUrl}/issues/${issueId}/attachment/download/${file}?authToken=${this.authToken}`
    return link
  }

  deleteIssueAttachment(issueId, file): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/issues/${issueId}/attachment/delete/${file}?authToken=${this.authToken}`, '')
    return response
  }

  editProject(projectId, data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/projects/${projectId}/edit?authToken=${this.authToken}`, data)
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
