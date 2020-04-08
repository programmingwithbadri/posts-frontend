import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  private mode = "create";
  private postId: string;
  post: Post;
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe((data) => {
          this.post = {
            id: data.post._id,
            title: data.post.title,
            content: data.post.content
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.valid) {
      if (this.mode === "create") {
        this.postsService.addPosts(form.value.title, form.value.content);
        form.resetForm();
      } else {
        this.postsService.updatePost(
          this.postId,
          form.value.title,
          form.value.content
        );
        form.resetForm();
      }
    }
  }
}
