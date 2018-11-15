import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpBackend } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DiceService } from './services/diceService';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { VsGameComponent } from './components/vs-game/vs-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    VsGameComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'storyMode', component: GameComponent },
      { path: 'vsMode', component: VsGameComponent },
    ])
  ],
  providers: [DiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
