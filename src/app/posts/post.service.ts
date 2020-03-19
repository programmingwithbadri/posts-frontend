import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private PostsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts]; // returns new post array
  }

  getPostUpdateListenter() {
    return this.PostsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    this.posts.push({
      title,
      content
    });
    this.PostsUpdated.next([...this.posts]);
  }
}
