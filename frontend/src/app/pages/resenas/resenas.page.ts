import { Component, OnInit } from '@angular/core';
import { TmbdService } from '../../services/tmbd.service';
import { ResenaService } from '../../services/resena.service';
import { LikeService } from '../../services/like.service';
import { AuthService } from '../../services/auth.service';
import { Resena } from 'src/app/models/Resena';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
  standalone: false
})
export class ResenasPage implements OnInit {
  resenas: any[] = [];

  constructor(
    private tmbdService: TmbdService,
    private resenaService: ResenaService,
    private likeService: LikeService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarResenasConDetalles();
  }

  async cargarResenasConDetalles() {
    try {
      const resenasBackend: Resena[] = await this.resenaService.getTodasResenas().toPromise() ?? [];

      const resenasConDetalles = await Promise.all(
        resenasBackend.map(async (resena) => {
          const detallePelicula = await this.tmbdService.getMovieDetail(resena.peliculaId).toPromise();

          let likesCount = 0;
          let likedByUser = false;

          try {
            const likeInfo = await this.likeService.getLikesInfo(resena.id).toPromise();
            if (likeInfo) {
              likesCount = likeInfo.likesCount;
              likedByUser = likeInfo.liked ?? false;
            }
          } catch (error) {
            console.error('Error obteniendo likes:', error);
          }

          return {
            ...resena,
            estrellas: Number(resena.valoracion) || 0,
            comentario: resena.texto,
            usuario: { username: resena.usuario },
            usuarioRut: resena.usuarioRut,
            pelicula: detallePelicula,
            created_at: resena.createdAt,
            updated_at: resena.updatedAt,
            expandido: false,
            likesCount,
            likedByUser
          };
        })
      );

      this.resenas = resenasConDetalles;

    } catch (error) {
      console.error('Error cargando reseñas o detalles:', error);
    }
  }

  toggleExpandir(index: number) {
    this.resenas[index].expandido = !this.resenas[index].expandido;
  }

  irAlPerfil(nombreUsuario?: string) {
    if (!nombreUsuario) return;
    this.router.navigate(['/perfil', nombreUsuario]);
  }

  async onClickLike(index: number) {
    const resena = this.resenas[index];
    const estaAutenticado = this.authService.isLoggedIn();


    if (!estaAutenticado) {
      const toast = await this.toastController.create({
        message: 'Debes iniciar sesión para dar like.',
        duration: 2500,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    try {
      if (resena.likedByUser) {
        const res = await this.likeService.quitarLike(resena.id).toPromise();
        resena.likedByUser = false;
        resena.likesCount = res.likesCount;
      } else {
        const res = await this.likeService.darLike(resena.id).toPromise();
        resena.likedByUser = true;
        resena.likesCount = res.likesCount;
      }
    } catch (error) {
      console.error('Error al dar/quitar like:', error);
    }
  }
}
