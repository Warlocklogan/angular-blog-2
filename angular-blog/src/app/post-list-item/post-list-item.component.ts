import {Component, Input, OnInit} from '@angular/core';
import { Post } from '../../models/Post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() index: number;
  post: Post;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
    this.post = new Post('', '', 0, Date.now().toString());
    this.postsService.getSinglePost(+this.index).then(
      (post: Post) => {
        this.post = post;
      }
    );
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }


  onUpLoveIt() {
    this.postsService.updateLoveIt(this.index, '+');
  }

  onDownLoveIt() {
    this.postsService.updateLoveIt(this.index, '-');
  }

}
