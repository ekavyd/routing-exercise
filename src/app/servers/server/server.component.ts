import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramSub: Subscription;
  fragmentSub: Subscription;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const queryId = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(queryId);
    //this.server = this.serversService.getServer(1);
    console.log("attempting to pull server via query param subs")
    this.paramSub = this.route.params.subscribe(
      (param: Params) => {
        const serverId = +param['id'];
        this.server = this.serversService.getServer(serverId);
      }
    );
    this.fragmentSub = this.route.fragment.subscribe();
    //this.server = this.serversService.getServer(1);

  }

  onEdit() {
    let permitEdit = this.route.snapshot.queryParams['allowEdit'];
    this.router.navigate(['/servers',this.server.id,'edit'], {queryParams: {allowEdit: permitEdit}});
  }

  ngOnDestroy(){
    this.paramSub.unsubscribe();
    this.fragmentSub.unsubscribe();
  }

}
