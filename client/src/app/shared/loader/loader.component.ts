import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService, private renderer2: Renderer2) { }
  
  show: boolean;

  ngOnInit() {
    this.loaderService.status.subscribe((value) => {
      this.show = value;
      if (value) {
        this.renderer2.setStyle(document.body, 'overflow', 'hidden');
      } else {
        this.renderer2.removeStyle(document.body, 'overflow');
      }
    });
  }
}