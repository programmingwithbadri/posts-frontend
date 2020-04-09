import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  isLoading = false;
  post: Post;
  form: FormGroup;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((data) => {
          this.isLoading = false;
          this.post = {
            id: data.post._id,
            title: data.post.title,
            content: data.post.content,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          })
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.valid) {
      this.isLoading = true;
      if (this.mode === "create") {
        this.postsService.addPosts(
          this.form.value.title,
          this.form.value.content
        );
        this.form.reset();
      } else {
        this.postsService.updatePost(
          this.postId,
          this.form.value.title,
          this.form.value.content
        );
        this.form.reset();
      }
    }
  }
}
