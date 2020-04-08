import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private PostsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.PostsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListenter() {
    return this.PostsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = {
      id: null,
      title,
      content,
    };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(() => {
        this.posts.push(post);
        this.PostsUpdated.next([...this.posts]);
      });
  }
}
