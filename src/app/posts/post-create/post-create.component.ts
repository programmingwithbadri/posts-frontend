import { Component } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  postValue = "";
  newPost = "";
  onAddPost() {
    this.newPost = this.postValue;
  }
}
