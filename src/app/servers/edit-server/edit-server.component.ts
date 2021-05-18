import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  paramSub: Subscription;
  queryParamSub : Subscription;
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    //retrieve query params -- two methods:: note single param pull via snapshot OR subscribe to them (dynamic)
    //console.log(this.route.snapshot.queryParams);
    //console.log(this.route.snapshot.fragment);

    this.paramSub = this.route.params.subscribe(
      (param: Params) => {
        this.server = this.serversService.getServer(+param['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    )

      this.queryParamSub = this.route.queryParams.subscribe(
        (param: Params) =>{
          this.allowEdit = param['allowEdit']=='true' ? true : false;
          console.log("allowed? "+ this.allowEdit);
        }
      )

    // this.server = this.serversService.getServer(1);
    //  this.serverName = this.server.name;
    //  this.serverStatus = this.server.status;
  }


  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
