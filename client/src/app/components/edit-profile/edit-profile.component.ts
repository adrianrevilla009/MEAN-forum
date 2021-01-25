import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: any;
  fileData: File = null;
  previewUrl:any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = {
        id: (profile as any).id,
        name: (profile as any).name,
        username: (profile as any).username,
        email: (profile as any).email,
        details: {
          country: (profile as any).details.country,
          city: (profile as any).details.city,
          adress: (profile as any).details.adress,
          telephone: (profile as any).details.telephone,
          image: (profile as any).details.image,
          short_description: (profile as any).details.short_description,
          about: (profile as any).details.about,
          check_newsletter:  (profile as any).details.check_newsletter,
          check_posts:  (profile as any).details.check_posts,
          check_offers:  (profile as any).details.check_offers,
          last_conexion: (profile as any).details.last_conexion,
          register_date: (profile as any).details.register_date
        }
      }
      // console.log('obteniendo perfil', this.user)
      // if obtengo file lo asigno al src
    },
    err => {
      console.log(err);
      return false;
    })
  }

  editProfile(form?: NgForm) {
    const user = {
        id: this.user.id,
        name: form.value.name,
        username: this.user.username,
        email: this.user.email,
        details: {
          country: form.value.country || "",
          city: form.value.city || "",
          adress: form.value.adress || "",
          telephone: form.value.telephone || "",
          image: this.fileData || "",
          short_description: form.value.short_description || "",
          about: form.value.about || "",
          check_newsletter:  form.value.check_newsletter || false,
          check_posts:  form.value.check_posts || false,
          check_offers:  form.value.check_offers || false,
          last_conexion: this.user.details.last_conexion || "",
          register_date: this.user.details.register_date || ""
        }
    }
    // console.log(user)
    // console.log(this.user)
    if (user != this.user) {
      this.authService.editProfile(user).subscribe(data => {
        if ((data as any).success) {
          console.log('guardar', (data as any).user)
          this.authService.storeUser((data as any).user);
          this.flashMessagesService.show('Your profile edited correctly!', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessagesService.show((data as any).msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['edit_profile']);
        }
      });
    }
  }

  onSelectFile(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

}
