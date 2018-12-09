import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../../models/Post.model';
import * as firebase from 'firebase';


@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() { }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data) =>{
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  updateLoveIt(index: number, change: string) {
    if (change === '+') {
      this.posts[index].loveIts++;
    } else if (change === '-') {
      this.posts[index].loveIts--;
    }
    this.savePosts();
    this.emitPosts();
  }
}
