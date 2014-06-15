Description du Projet Pi Project
	Ce projet avait pour but de mettre en place une interface utilisateur pour accéder à des musiques et des vidéos sur un Raspberry PI, ainsi qu'à un certain nombre d'informations sur ces musiques et vidéos.

		1.	Nous avons utilisé le framework boostrap pour le design du site, qui évolue en fonction de la taille de l'écran
		2.	Nous avons utilisé le nesting pour la mise en place du style, dans le fichier main.scss. De plus, nous avons créé un dossier "standards/" qui regroupe tous les mixins, dimensions, couleurs et fonts utilisées. Celles-ci sont utilisées dans le fichier main.scss
		3.	Pour l'affichage des différentes vidéos et musiques, nous avons utilisé le routeProvider, des directives ainsi qu'un filtre pour permettre une recherche. De plus ces affichages sont ordonnés.


	Ce projet est assez complet, mais il manque tout de même un détail qui le rendrait beaucoup plus intéressant : la mise en place d'un serveur sur le raspberry Pi pour le stockage des données.
	En effet, pour le moment, les données sont tirées d'un fichier JSON local. Lors d'un ajout d'une musique ou vidéo, on stocke le JSON dans le LocalStorage, ce qui veut dire que le JSON n'est pas modifié. Ceci est particulièrement dommage étant donné que nous avons utilisé l'api IMDB pour aller chercher un grand nombre d'informations sur un film lors de son ajout.