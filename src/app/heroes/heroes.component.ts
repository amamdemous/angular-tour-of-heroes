import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from './hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  public heroes: Hero[] = [];

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.heroService.getAllHeroes().subscribe((value) => (this.heroes = value));
  }

  add(name: string) {
    name = name.trim();
    if (!name) return;

    this.heroService
      .addHero({ name } as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
