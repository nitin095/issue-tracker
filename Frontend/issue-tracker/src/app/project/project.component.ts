import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './../app.service';
import { MatSnackBar, MatRipple } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileUploadValidators, FileUploadControl } from '@iplab/ngx-file-upload';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;

  userDetails = this.appService.getUserInfoFromLocalstorage();
  loading: Boolean;
  users: any;
  project: any;
  newProject: Boolean = true;
  projectTeam: Array<String> = [];
  addDescription: Boolean = false;
  addProjectMember: Boolean = false;
  addAttachment: Boolean = false;
  description: String;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no'
  }
  uploadedFiles: Array<File> = [];

  public fileUploadControl = new FileUploadControl(FileUploadValidators.fileSize(5000000));

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let projectId = this._route.snapshot.paramMap.get('id');
      if (projectId !== 'new') this.getProject(projectId)
    });
  }

  createProject(title) {
    this.loading = true;
    this.projectTeam.push(this.userDetails.userId);
    let newProject = {
      title: title,
      key: title.split(' ').map(x => x.split('-')).flat().map(x => x[0]).join("").toUpperCase(),
      createdBy: this.userDetails.userId,
      team: this.projectTeam
    }
    console.log(newProject)

    this.appService.createProject(newProject).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          console.log(response)
          this.newProject = false;
          this.project = response.data
        } else {
          this.project = null;
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
        }
      },
      error => {
        this.loading = false;
        this.project = null;
        this.snackBar.open(error, 'Close', { duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )

  }

  getProject(id) {
    this.loading = true;
    this.newProject = false;
    this.appService.getProject(id).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          console.log(response)
          this.project = response.data
        } else {
          this.project = null;
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
        }
      },
      error => {
        this.loading = false;
        this.project = null;
        this.snackBar.open(error, 'Close', { duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  uploadAttachment() {
    this.loading = true;
    this.fileUploadControl.disable();
    this.appService.addIssueAttachment(this.project.projectId, this.uploadedFiles).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%')
        } else if (event.type === HttpEventType.Response) {
          this.loading = false;
          if (event.status === 200) {
            this.addAttachment = false;
            console.log(event.data)
          } else {
            this.fileUploadControl.enable();
            this.snackBar.open(event.message, 'Close', { duration: 4000, });
            console.log(event.message)
          }
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'Close', { duration: 4000, });
        this.loading = false;
        this.fileUploadControl.enable();
        console.log("some error occured");
        console.log(error)
      }
    )

  }//end uploadAttachment

  clearAttachments(): void {
    this.fileUploadControl.clear();
  }

  searchUsers(searchQuery) {
    if (!searchQuery) return
    this.loading = true;
    this.appService.searchUsers(this.userDetails.userId, searchQuery).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.users = response.data
        } else {
          this.users = null;
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
        }
      },
      error => {
        this.loading = false;
        this.users = null;
        this.snackBar.open(error, 'Close', { duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )
  }// end  getIssues

  addUserToTeam(user) {
    if (!this.project.team.includes(user)) {
      this.project.team.push(user);
      this.editproject({ team: this.project.team })
    } else return
  }

  removeUserFromTeam(user) {
    this.project.team.splice(this.project.team.indexOf(user), 1);
    this.editproject({ team: this.project.team })
  }

  addMember(id) {
    if (!this.projectTeam.includes(id)) this.projectTeam.push(id)
    else return
  }

  removeMember(id) {
    this.projectTeam.splice(this.projectTeam.indexOf(id), 1)
  }

  editproject(field) {
    this.loading = true;
    this.appService.editProject(this.project.projectId, field).subscribe(
      response => {
        this.loading = false;
        if (response.status === 200) {
          this.project = response.data
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 4000, });
        }
      },
      error => {
        this.loading = false;
        this.snackBar.open(error, 'Close', { duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true
    });
    setTimeout(() => rippleRef.fadeOut(), 300)
  }

}
