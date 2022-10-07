import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getTopHeroes();
  }

  getTopHeroes(): void {
    this.heroService
      .getAllHeroes()
      .subscribe((value) => (this.heroes = value.slice(1, 5)));
  }
}
