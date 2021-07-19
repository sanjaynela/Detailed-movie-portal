import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CastDetails } from 'src/app/models/CastDetails';
import { CastDetail } from 'src/app/models/CastDetail';
import { CastService } from '../../services/cast.service';
import { CastExternals } from 'src/app/models/CastExternals';


@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class ModalConfigComponent implements OnInit {
  @Input() castDetail:CastDetails;
  currentCastDetail:CastDetail;
  castExternalDetails:CastExternals;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private castService: CastService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.castDetail = new CastDetails();
    this.currentCastDetail = new CastDetail();
    this.castExternalDetails = new CastExternals();
  }

  ngOnInit(): void {
  }

  open(content:any,castId:string) {
    this.castService.getCastDetails(castId).subscribe(currentCastDetail => {
      this.currentCastDetail = currentCastDetail;
    });

    this.castService.getExternalDetails(castId).subscribe(externalDetails =>{
      this.castExternalDetails = externalDetails;
    })

    this.modalService.open(content,{ size: 'lg', backdrop: 'static' });
    // this.modalService.open(content,{ windowClass : "myCustomModalClass"});
  }

}
