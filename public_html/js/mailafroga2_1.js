$(document).ready(function() {
    //var id = 1;
    $(".imagen2").attr("src", "images/image00.jpg");
        ocultar();
        $('#zona').html(' ');
        $("body").on("click", ".opcion1", function(){
            mostrarPeliculas();
            ocultar();
            $("#zona").show();
        });
        
        $("body").on("click", ".opcion2", function(){
            ocultar();
            $("#zona1").show();
            
            //iniciar mejor pelicula
            var mejoresPelis = [];

                var pelis = $('#imagenes .imagen2').length;

                for (i=0;i<pelis;i++){
                    eq = i+1;
                    idPeli = $('#zona tr:eq('+eq+') td:eq(0)').html();
                    meGusta = $('#zona tr:eq('+eq+') td:eq(2)').html();
                    noGusta = $("#zona tr:eq("+eq+") td:eq(3)").html();
                    votos = meGusta - noGusta;
                    foto = $("#zona tr:eq("+eq+") td:eq(4) img").attr('src');

                    var data = {};
                    data.idPeli = idPeli;
                    data.votos = votos;
                    data.foto = foto;

                    mejoresPelis.push(data);
                }
                mejoresPelis.sort(function(a, b){return b.votos-a.votos});

                for (i = 0; i<3;i++) {
                  //alert(mejoresPelis[i]['foto']);
                  $('#clasificacion .imagen2:eq('+i+')').attr('src', mejoresPelis[i]['foto']);

                }
        });
        
        $("body").on("click", ".numerico", function(){
            var valor = parseInt($(this).text());
            var total = valor + 1;
            $(this).text(total);
        });
        
    
    //mostrar lista de peliculas
        function mostrarPeliculas(){
            $('#zona').html(' ');
                $.ajax({
                    type:'POST',
                    dstaType:'json',
                    url:"json/datosJSON.json",
            success:function(datos) {    
                var nuevo = "<table>\n\
                            <tr>\n\
                            <th>registro</th> <th>titulo</th> <th>me gusta</th> <th>no me gusta</th> <th>foto</th>\n\
                            </tr>";
                midato = datos;              
             $.each( midato, function(i,dato) {
                nuevo += '<tr>';
	        nuevo += '<td class="id">'+dato.id+'</td>';
                nuevo += '<td class="nombre">'+dato.titulo+'</td>';
                nuevo += '<td class="numerico">'+dato.megusta+'</td>';
                nuevo += '<td class="numerico">'+dato.nogusta+'</td>';
                nuevo += '<td><img class="misfotos" src="'+dato.foto+'"></td>';
                nuevo += "</tr>";
                
                //Sirve para recorrer uno por uno los objetos que tengan como class .imgen2
                $('.imagen2:eq('+i+')').attr('src', dato.foto);
                
                //$("#"+id).attr("src", dato.foto);
                //id++;
            
            });
            nuevo += "</table>";
             $('#zona').append(nuevo).hide().fadeIn('slow');
             return false;
            }, 
        error: function(xhr){
                alert("An error occured: " + xhr.status + " " + xhr.statusText);  
             }           
             });
        }       
        
        function ocultar(){
            $("#zona").hide();
            $("#zona1").hide();
        }
  
        
        
  });      
  







   
   // ------------------tabla dinamica------
//  $(document).on("click","td",function(){
//       
//     });       
   


        
