import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/Post.model';
import { Subscription } from 'rxjs/Subscription';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
    this.postsService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  onUpLoveIt(post: Post) {
    this.postsService.updateLoveIt(post, '+');
  }

  onDownLoveIt(post: Post) {
    this.postsService.updateLoveIt(post, '-');
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
