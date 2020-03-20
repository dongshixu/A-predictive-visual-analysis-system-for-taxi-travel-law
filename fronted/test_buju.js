$(document).ready(function(){
    /**  
     * 天地图内容  
     */  
    var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {  
            maxZoom: 18,  
            minZoom: 2  
        }),  
        normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {  
            maxZoom: 18,  
            minZoom: 2  
        }),  
        imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {  
            maxZoom: 18,  
            minZoom: 2  
        }),  
        imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {  
            maxZoom: 18,  
            minZoom: 2  
        });
    
    var normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {  
            maxZoom: 18,  
            minZoom: 5  
        }),  
        satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {  
            maxZoom: 18,  
            minZoom: 5  
        }); 
        
    var normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {  
        maxZoom: 16,  
        minZoom: 1  
    });  
  	
  	var newmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png');
  	
    var normal = L.layerGroup([normalm, normala]),  
        image = L.layerGroup([imgm, imga]);  
   
         var baseLayers = {  
        "天地图": normal,  
        "天地图影像": image,
        "谷歌地图": normalMap,  
        "谷歌影像": satelliteMap,
        "智图灰色": normalm4,
        "新地图": newmap,
    }
        
    
    var map = L.map("map", {  
        center: [27.98427566436123, 120.68041992606597],  
        zoom: 12,  
        layers: [normalm4],
//      layers: [normalMap],
        zoomControl: false  
    });  
  	
  	
//  L.control.layers(baseLayers, null).addTo(map);  
    L.control.zoom({  
        zoomInTitle: '放大',  
        zoomOutTitle: '缩小'  
    }).addTo(map);  
      
    	var list = [];
		var list2 = [];
		var list3 = [];
		var nodes = [];
		var count = 1;
		var count1 = 0
		var b = 0
		var jishu = 0;
		var stop = 0;
		var action = true;
		var fg, flag;
		var x = 28.02376523468831 - 28.020469307572167//28.019919976576134
		var y = 120.66282033920290 - 120.66672563552858
		var reaceselect_flag = true;
		var road_point, road_point_list = [], RS, RS_list = [], RS_list_detial = [], RS_list_detial1 = [], centerlist = [];
		var modechooseflag = true, mode_flag = 0;
		
		
		$("#modeicon").on("click", function(){
			if(modechooseflag){
				$("#model").css("display", "block");
				modechooseflag = false;
			}else{
				$("#model").css("display", "none");
				modechooseflag = true;
			}
		})
		$("#modeicon").on("dblclick", function(){
			mode_flag = null;
			$('#modeicon i').css("color", "black")
		})
		d3.selectAll("#model p").on("click", function(){
				let value_inner = $(this).html();
				if(value_inner == "Prediction"){
					mode_flag = 2;
					$('#modeicon i').removeClass().addClass("fa fa-paper-plane").css({"left": "8px", "top": "9px", "font-size": "15px", "color": "#EE927D"}).attr("title", "Prediction mode")
					d3.selectAll(".circle0").remove();
					d3.selectAll(".haha").remove();
					d3.selectAll(".leaflet-popup").remove();
					d3.selectAll(".trip1").remove();
				  	for(var j = 0; j<678; j++){
						var A = "road"+(j)
						d3.select('.'+A).remove()		
					}
				  	$("#show_road_icon").css('display', 'none')
				  	$("#show_road_count").css('display', 'none')
				  	$("#tripinfo").css('display', "none")
				  	d3.selectAll(".road").remove();
				  	$("#toolbar").fadeOut(500);
					d3.selectAll(".road").remove();
				  	cleanselect()
				}else if(value_inner == "Taxi"){
					mode_flag = 0;
					$('#modeicon i').removeClass().addClass("fa fa-taxi").css({"left": "9px", "top": "8px", "font-size": "15px", "color": "#EE927D"}).attr("title", "Taxi mode")
					clear4();
					d3.selectAll(".road1").remove()
					d3.selectAll(".road2").remove()
					d3.selectAll(".road").remove()
					d3.selectAll(".haha").remove()
					d3.selectAll(".markerpoi1").remove()
					d3.selectAll(".markerpoi2").remove()
					$("#plan1").slideUp(300);
					$("#plan2").slideUp(300);
					RS_set = [];
					index_d = [];
					$("#toolbar").fadeOut(500);
					$("#originInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"});
		    		$("#destinationInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"})
		    		onMapclickCount = 0;
		    		$("#cli_position img").attr("src", "img/position1.png")
		    		cli_positionFlag = true;
		    		$("#toolbar").fadeOut(500);
					d3.selectAll(".road").remove();
		    		map.off("click", onMapclick)
					cleanselect()
					taxi_mode_show_road()
				}else if(value_inner == "Road"){
					mode_flag = 1;
					$('#modeicon i').removeClass().addClass("fa fa-road").css({"left": "7px", "top": "8px", "font-size": "18px", "color": "#EE927D"}).attr("title", "Road mode")
					clear4();
					d3.selectAll(".road1").remove()
					d3.selectAll(".road2").remove()
					d3.selectAll(".road").remove()
					d3.selectAll(".markerpoi1").remove()
					d3.selectAll(".markerpoi2").remove()
					$("#plan1").slideUp(300);
					$("#plan2").slideUp(300);
					d3.selectAll(".circle0").remove();
					d3.selectAll(".haha").remove();
					d3.selectAll(".leaflet-popup").remove();
					d3.selectAll(".trip1").remove();
				  	for(var j = 0; j<678; j++){
						var A = "road"+(j)
						d3.select('.'+A).remove()		
					}
				  	$("#show_road_icon").css('display', 'none')
				  	$("#show_road_count").css('display', 'none')
				  	$("#tripinfo").css('display', "none")
				  	$("#originInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"});
		    		$("#destinationInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"});
		    		onMapclickCount = 0;
		    		$("#cli_position img").attr("src", "img/position1.png")
		    		cli_positionFlag = true;
		    		map.off("click", onMapclick)
				}
				$(this).parent().css("display", "none");
				modechooseflag = true;
		})
//**********************************************获取路口,和所有路段***********************************************//

		
		$(function(){
			var show_taxi_flow_f = true;
			$( "#show_taxi_flow" ).on("click", function(){
				if(show_taxi_flow_f){
					show_taxi_flow_f = false;
					$( "#taxi_table" ).css("display", "none")
					$( "#flow_table" ).css("display", "block")
				}else{
					show_taxi_flow_f = true;
					$( "#taxi_table" ).css("display", "block")
					$( "#flow_table" ).css("display", "none")
				}
			})
			let data1 = $(".D1").val().substring(8, $(".D1").val().length)
			var data = {"x":132.3242432,"y":12.32356622}
			var jsondata = JSON.stringify(data), jsondata1 = JSON.stringify(data1)
			$.ajax({
			  	type: 'post',
			  	data: jsondata,
			  	url: "http://127.0.0.1:8000/admin/posttest1/",
			  	success: function(result){
			  		road_point = result.data;	
			  		for (i=0; i<road_point.length; i++){
			  			road_point_list.push([
			  				parseFloat(road_point[i].lat),
			  				parseFloat(road_point[i].lng)
			  			])
			  		}
		  		},
		  		dataType: 'JSON',
			});

			$.ajax({
			  	type: 'post',
			  	data: jsondata,
			  	url: "http://127.0.0.1:8000/admin/post_view2.0_4/",
			  	success: function(result){
			  		RS = result.data;
			  		for(var i = 0; i<RS.length; i++){
			  			RS_list.push(RS[i].R);
			  		}
			  		for(var i = 0; i<RS_list.length; i++){
			  			var xyz = [];
			  			for(var j = 0; j<RS_list[i].length; j++){
			  				xyz.push(RS_list[i][j].lat);
			  				xyz.push(RS_list[i][j].lng);
			  			};
			  			RS_list_detial.push(xyz);
			  		};
			  		for(var k = 0; k<RS_list.length; k++){
			  			var jk = RS_list[k].length-1;
			  			RS_list_detial1.push([
			  				[parseFloat(RS_list[k][0].lat),
			  				parseFloat(RS_list[k][0].lng)],
			  				
			  				[parseFloat(RS_list[k][jk].lat),
			  				parseFloat(RS_list[k][jk].lng)],
			  			])
			  		}
			  		
					let jj = 2.5;
					let color;
					for(let j = 0; j<RS_list.length; j++){
						color = "none"
				  		if(RS_list[j].length == 4){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][3].lat),parseFloat(RS_list[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  					    .addTo(map);
				  		}else if(RS_list[j].length == 3){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}
				  		centerlist.push(polyline.getCenter())
					}
					d3.selectAll(".road").remove()
		  		},
		  		dataType: 'JSON',
			});
		});
		
		function clear6(){
			$("#clock").fadeOut(800);
			d3.selectAll(".taxi").remove();
		}
//*********************************************************************************************//		
		
		//点击地图获取坐标
		var startendurl = ['img/S2.png', 'img/E2.png']
		function Icon1(a){
			var myIcon = L.icon({
			    iconUrl: a,
			    iconSize: [24, 38],
			    iconAnchor: [13, 36],
			    popupAnchor: [0, -33],
			    shadowUrl: '',
			    shadowSize: [27, 44],
			    shadowAnchor: [7, 42],
			    className: 'haha'
			});
			return myIcon
		}
		var onMapclickCount = 0, onMapclickPointer = [];
		function onMapclick(e,latlngCount){
			if(onMapclickCount<2){
				var a = e.latlng;
				console.log(a)
				onMapclickPointer.push(a);
				let latlngString = a.lat.toString().substring(0,10)+"&"+a.lng.toString().substring(0,11);
				if(onMapclickCount==0){
					L.marker(a, {icon: Icon1(startendurl[0])}).addTo(map).on("click", pointListremove);
					$("#originInput").val(latlngString).css({
							"color": "black",
							"font-weight": "600",
						})
				}else{
					L.marker(a, {icon: Icon1(startendurl[1])}).addTo(map).on("click", pointListremove);
					$("#destinationInput").val(latlngString).css({
							"color": "black",
							"font-weight": "600",
						})
				}
				onMapclickCount++;
				console.log(onMapclickPointer)
			}
			function pointListremove(e){
	    		this.remove();
	    		for(let i = 0; i<onMapclickPointer.length; i++){
						if(onMapclickPointer[i] == e.latlng){
							onMapclickPointer.splice(i,1);
							break;
						}
					}
	    		onMapclickCount--;
	    		console.log(onMapclickPointer);
	    	}
		}
		
//***************************************select添加option******************************************************//
		var taxiName = ['浙C02668', '浙C02678', '浙C03860', '浙C04248', '浙C04337', '浙C04348', '浙C04351', '浙C04628', '浙C04651', '浙C04652', '浙C04658', '浙C04675', '浙C04876', '浙C04937', '浙C04974', '浙C05132', '浙C05135', '浙C05196', '浙C05202', '浙C05203', '浙C05215', '浙C05225', '浙C05228', '浙C08317', '浙C10257', '浙C10338', '浙C105BN', '浙C12696', '浙C13678', '浙C13722', '浙C15029', '浙C16259', '浙C16260', '浙C18667', '浙C18A59', '浙C19560', '浙C20933', '浙C27306', '浙C28P16', '浙C34980', '浙C39986', '浙C54101', '浙C88Y07', '浙CA0356', '浙CA0358', '浙CA1985', '浙CA6681', '浙CA6918', '浙CA9163', '浙CA9332', '浙CA9502', '浙CA9603', '浙CAD965', '浙CAD997', '浙CAG202', '浙CAH085', '浙CAJ887', '浙CAK061', '浙CAN192', '浙CAQ299', '浙CAQ973', '浙CAQ983', '浙CB5779', '浙CB5788', '浙CC2706', '浙CC2729', '浙CC2751', '浙CC2759', '浙CC2760', '浙CC2762', '浙CC2767', '浙CC2769', '浙CC2772', '浙CC2776', '浙CC2779', '浙CC2781', '浙CC2782', '浙CC2783', '浙CC2785', '浙CC2786', '浙CC2787', '浙CC2788', '浙CC2796', '浙CC2797', '浙CC3027', '浙CC3039', '浙CC3056', '浙CC3060', '浙CC3066', '浙CC3070', '浙CC3073', '浙CC3105', '浙CC3127', '浙CC3159', '浙CC5719', '浙CC6151', '浙CCC616', '浙CCC627', '浙CCC643', '浙CF5882', '浙CF7075', '浙CF7962', '浙CF7990', '浙CF8502', '浙CF8519', '浙CF9051', '浙CF9809', '浙CF9850', '浙CF9860', '浙CF9876', '浙CF9879', '浙CM1528', '浙CM1557', '浙CM1575', '浙CM1576', '浙CM1581', '浙CT0002', '浙CT0003', '浙CT0004', '浙CT0005', '浙CT0006', '浙CT0007', '浙CT0008', '浙CT0009', '浙CT0010', '浙CT0011', '浙CT0012', '浙CT0015', '浙CT0017', '浙CT0018', '浙CT0019', '浙CT0020', '浙CT0023', '浙CT0025', '浙CT0026', '浙CT0027', '浙CT0028', '浙CT0029', '浙CT0030', '浙CT0032', '浙CT0036', '浙CT0037', '浙CT0038', '浙CT0039', '浙CT0043', '浙CT0045', '浙CT0046', '浙CT0048', '浙CT0050', '浙CT0051', '浙CT0054', '浙CT0055', '浙CT0056', '浙CT0058', '浙CT0060', '浙CT0062', '浙CT0063', '浙CT0064', '浙CT0066', '浙CT0067', '浙CT0068', '浙CT0069', '浙CT0070', '浙CT0072', '浙CT0073', '浙CT0074', '浙CT0075', '浙CT0076', '浙CT0077', '浙CT0078', '浙CT0080', '浙CT0081', '浙CT0082', '浙CT0083', '浙CT0084', '浙CT0085', '浙CT0087', '浙CT0088', '浙CT0089', '浙CT0090', '浙CT0091', '浙CT0093', '浙CT0094', '浙CT0095', '浙CT0096', '浙CT0097', '浙CT0098', '浙CT0099', '浙CT0100', '浙CT0101', '浙CT0102', '浙CT0103', '浙CT0105', '浙CT0106', '浙CT0107', '浙CT0108', '浙CT0110', '浙CT0111', '浙CT0113', '浙CT0115', '浙CT0116', '浙CT0117', '浙CT0118', '浙CT0121', '浙CT0123', '浙CT0124', '浙CT0125', '浙CT0126', '浙CT0128', '浙CT0129', '浙CT0130', '浙CT0133', '浙CT0135', '浙CT0137', '浙CT0138', '浙CT0140', '浙CT0141', '浙CT0146', '浙CT0148', '浙CT0150', '浙CT0151', '浙CT0152', '浙CT0154', '浙CT0156', '浙CT0157', '浙CT0158', '浙CT0159', '浙CT0160', '浙CT0162', '浙CT0164', '浙CT0167', '浙CT0169', '浙CT0171', '浙CT0172', '浙CT0173', '浙CT0176', '浙CT0177', '浙CT0179', '浙CT0183', '浙CT0184', '浙CT0186', '浙CT0187', '浙CT0188', '浙CT0189', '浙CT0191', '浙CT0192', '浙CT0193', '浙CT0194', '浙CT0196', '浙CT0198', '浙CT0201', '浙CT0203', '浙CT0205', '浙CT0206', '浙CT0207', '浙CT0208', '浙CT0210', '浙CT0211', '浙CT0213', '浙CT0214', '浙CT0217', '浙CT0218', '浙CT0219', '浙CT0220', '浙CT0221', '浙CT0222', '浙CT0223', '浙CT0225', '浙CT0226', '浙CT0227', '浙CT0228', '浙CT0229', '浙CT0230', '浙CT0232', '浙CT0233', '浙CT0237', '浙CT0239', '浙CT0240', '浙CT0241', '浙CT0245', '浙CT0247', '浙CT0249', '浙CT0250', '浙CT0251', '浙CT0252', '浙CT0253', '浙CT0256', '浙CT0257', '浙CT0258', '浙CT0259', '浙CT0261', '浙CT0265', '浙CT0266', '浙CT0267', '浙CT0268', '浙CT0269', '浙CT0270', '浙CT0271', '浙CT0272', '浙CT0273', '浙CT0275', '浙CT0276', '浙CT0277', '浙CT0278', '浙CT0279', '浙CT0280', '浙CT0281', '浙CT0282', '浙CT0283', '浙CT0284', '浙CT0285', '浙CT0286', '浙CT0287', '浙CT0288', '浙CT0289', '浙CT0290', '浙CT0291', '浙CT0292', '浙CT0293', '浙CT0294', '浙CT0296', '浙CT0297', '浙CT0298', '浙CT0299', '浙CT0300', '浙CT0301', '浙CT0302', '浙CT0304', '浙CT0306', '浙CT0308', '浙CT0309', '浙CT0310', '浙CT0311', '浙CT0312', '浙CT0313', '浙CT0316', '浙CT0318', '浙CT0319', '浙CT0320', '浙CT0321', '浙CT0322', '浙CT0323', '浙CT0324', '浙CT0325', '浙CT0327', '浙CT0328', '浙CT0329', '浙CT0330', '浙CT0331', '浙CT0332', '浙CT0337', '浙CT0339', '浙CT0340', '浙CT0342', '浙CT0344', '浙CT0345', '浙CT0347', '浙CT0348', '浙CT0349', '浙CT0350', '浙CT0351', '浙CT0352', '浙CT0353', '浙CT0354', '浙CT0355', '浙CT0356', '浙CT0357', '浙CT0358', '浙CT0359', '浙CT0360', '浙CT0361', '浙CT0362', '浙CT0363', '浙CT0365', '浙CT0368', '浙CT0369', '浙CT0370', '浙CT0371', '浙CT0372', '浙CT0373', '浙CT0375', '浙CT0377', '浙CT0379', '浙CT0380', '浙CT0381', '浙CT0383', '浙CT0384', '浙CT0385', '浙CT0386', '浙CT0387', '浙CT0388', '浙CT0389', '浙CT0390', '浙CT0392', '浙CT0393', '浙CT0395', '浙CT0396', '浙CT0397', '浙CT0398', '浙CT0399', '浙CT0400', '浙CT0401', '浙CT0402', '浙CT0406', '浙CT0407', '浙CT0410', '浙CT0411', '浙CT0413', '浙CT0414', '浙CT0415', '浙CT0417', '浙CT0418', '浙CT0420', '浙CT0421', '浙CT0422', '浙CT0423', '浙CT0424', '浙CT0427', '浙CT0429', '浙CT0430', '浙CT0431', '浙CT0432', '浙CT0433', '浙CT0434', '浙CT0435', '浙CT0436', '浙CT0437', '浙CT0438', '浙CT0440', '浙CT0442', '浙CT0443', '浙CT0445', '浙CT0446', '浙CT0447', '浙CT0449', '浙CT0450', '浙CT0451', '浙CT0452', '浙CT0453', '浙CT0454', '浙CT0455', '浙CT0456', '浙CT0458', '浙CT0459', '浙CT0461', '浙CT0463', '浙CT0465', '浙CT0466', '浙CT0467', '浙CT0470', '浙CT0471', '浙CT0472', '浙CT0474', '浙CT0475', '浙CT0476', '浙CT0478', '浙CT0480', '浙CT0481', '浙CT0482', '浙CT0484', '浙CT0486', '浙CT0487', '浙CT0488', '浙CT0489', '浙CT0490', '浙CT0492', '浙CT0493', '浙CT0495', '浙CT0496', '浙CT0498', '浙CT0499', '浙CT0501', '浙CT0502', '浙CT0506', '浙CT0507', '浙CT0508', '浙CT0509', '浙CT0511', '浙CT0513', '浙CT0514', '浙CT0516', '浙CT0517', '浙CT0518', '浙CT0519', '浙CT0523', '浙CT0524', '浙CT0526', '浙CT0527', '浙CT0528', '浙CT0529', '浙CT0532', '浙CT0533', '浙CT0534', '浙CT0535', '浙CT0538', '浙CT0539', '浙CT0540', '浙CT0541', '浙CT0542', '浙CT0543', '浙CT0544', '浙CT0545', '浙CT0546', '浙CT0547', '浙CT0549', '浙CT0550', '浙CT0551', '浙CT0553', '浙CT0554', '浙CT0557', '浙CT0558', '浙CT0559', '浙CT0560', '浙CT0562', '浙CT0563', '浙CT0564', '浙CT0566', '浙CT0568', '浙CT0570', '浙CT0572', '浙CT0573', '浙CT0575', '浙CT0577', '浙CT0578', '浙CT0579', '浙CT0580', '浙CT0581', '浙CT0582', '浙CT0583', '浙CT0584', '浙CT0585', '浙CT0587', '浙CT0588', '浙CT0589', '浙CT0590', '浙CT0591', '浙CT0593', '浙CT0594', '浙CT0595', '浙CT0596', '浙CT0597', '浙CT0598', '浙CT0599', '浙CT0600', '浙CT0601', '浙CT0602', '浙CT0603', '浙CT0604', '浙CT0606', '浙CT0608', '浙CT0609', '浙CT0610', '浙CT0612', '浙CT0613', '浙CT0616', '浙CT0617', '浙CT0618', '浙CT0619', '浙CT0621', '浙CT0622', '浙CT0624', '浙CT0625', '浙CT0627', '浙CT0628', '浙CT0629', '浙CT0630', '浙CT0631', '浙CT0632', '浙CT0633', '浙CT0636', '浙CT0637', '浙CT0638', '浙CT0639', '浙CT0641', '浙CT0646', '浙CT0647', '浙CT0649', '浙CT0652', '浙CT0653', '浙CT0654', '浙CT0655', '浙CT0656', '浙CT0657', '浙CT0658', '浙CT0659', '浙CT0660', '浙CT0661', '浙CT0662', '浙CT0664', '浙CT0665', '浙CT0666', '浙CT0667', '浙CT0668', '浙CT0670', '浙CT0673', '浙CT0676', '浙CT0677', '浙CT0679', '浙CT0680', '浙CT0681', '浙CT0682', '浙CT0684', '浙CT0687', '浙CT0688', '浙CT0689', '浙CT0690', '浙CT0691', '浙CT0692', '浙CT0693', '浙CT0694', '浙CT0695', '浙CT0696', '浙CT0697', '浙CT0698', '浙CT0700', '浙CT0702', '浙CT0703', '浙CT0705', '浙CT0706', '浙CT0707', '浙CT0709', '浙CT0713', '浙CT0714', '浙CT0716', '浙CT0717', '浙CT0719', '浙CT0721', '浙CT0723', '浙CT0725', '浙CT0727', '浙CT0728', '浙CT0729', '浙CT0730', '浙CT0731', '浙CT0732', '浙CT0733', '浙CT0734', '浙CT0735', '浙CT0738', '浙CT0739', '浙CT0740', '浙CT0741', '浙CT0742', '浙CT0744', '浙CT0745', '浙CT0747', '浙CT0748', '浙CT0749', '浙CT0750', '浙CT0751', '浙CT0755', '浙CT0756', '浙CT0758', '浙CT0762', '浙CT0766', '浙CT0767', '浙CT0769', '浙CT0771', '浙CT0773', '浙CT0775', '浙CT0776', '浙CT0778', '浙CT0779', '浙CT0780', '浙CT0781', '浙CT0782', '浙CT0786', '浙CT0788', '浙CT0789', '浙CT0791', '浙CT0792', '浙CT0793', '浙CT0794', '浙CT0795', '浙CT0796', '浙CT0797', '浙CT0798', '浙CT0799', '浙CT0801', '浙CT0802', '浙CT0804', '浙CT0805', '浙CT0806', '浙CT0808', '浙CT0809', '浙CT0810', '浙CT0812', '浙CT0813', '浙CT0814', '浙CT0815', '浙CT0816', '浙CT0817', '浙CT0818', '浙CT0820', '浙CT0823', '浙CT0824', '浙CT0825', '浙CT0827', '浙CT0828', '浙CT0829', '浙CT0830', '浙CT0833', '浙CT0834', '浙CT0835', '浙CT0836', '浙CT0839', '浙CT0840', '浙CT0842', '浙CT0843', '浙CT0844', '浙CT0845', '浙CT0846', '浙CT0847', '浙CT0848', '浙CT0850', '浙CT0852', '浙CT0853', '浙CT0855', '浙CT0856', '浙CT0858', '浙CT0859', '浙CT0860', '浙CT0862', '浙CT0863', '浙CT0865', '浙CT0866', '浙CT0867', '浙CT0869', '浙CT0870', '浙CT0871', '浙CT0872', '浙CT0873', '浙CT0874', '浙CT0875', '浙CT0877', '浙CT0878', '浙CT0879', '浙CT0881', '浙CT0884', '浙CT0886', '浙CT0887', '浙CT0888', '浙CT0889', '浙CT0890', '浙CT0891', '浙CT0892', '浙CT0893', '浙CT0894', '浙CT0895', '浙CT0897', '浙CT0898', '浙CT0899', '浙CT0900', '浙CT0902', '浙CT0903', '浙CT0905', '浙CT0906', '浙CT0907', '浙CT0908', '浙CT0909', '浙CT0910', '浙CT0911', '浙CT0912', '浙CT0914', '浙CT0915', '浙CT0916', '浙CT0917', '浙CT0919', '浙CT0920', '浙CT0923', '浙CT0924', '浙CT0925', '浙CT0926', '浙CT0927', '浙CT0929', '浙CT0931', '浙CT0932', '浙CT0933', '浙CT0935', '浙CT0937', '浙CT0938', '浙CT0939', '浙CT0940', '浙CT0943', '浙CT0944', '浙CT0946', '浙CT0948', '浙CT0950', '浙CT0951', '浙CT0952', '浙CT0953', '浙CT0954', '浙CT0955', '浙CT0957', '浙CT0958', '浙CT0959', '浙CT0960', '浙CT0961', '浙CT0963', '浙CT0966', '浙CT0968', '浙CT0970', '浙CT0971', '浙CT0972', '浙CT0974', '浙CT0975', '浙CT0976', '浙CT0977', '浙CT0978', '浙CT0982', '浙CT0983', '浙CT0984', '浙CT0985', '浙CT0986', '浙CT0987', '浙CT0988', '浙CT0989', '浙CT0990', '浙CT0992', '浙CT0993', '浙CT0994', '浙CT0995', '浙CT0996', '浙CT0997', '浙CT0999', '浙CT1000', '浙CT1001', '浙CT1003', '浙CT1004', '浙CT1005', '浙CT1006', '浙CT1007', '浙CT1008', '浙CT1009', '浙CT1011', '浙CT1012', '浙CT1014', '浙CT1016', '浙CT1017', '浙CT1018', '浙CT1019', '浙CT1020', '浙CT1021', '浙CT1022', '浙CT1023', '浙CT1024', '浙CT1025', '浙CT1026', '浙CT1028', '浙CT1031', '浙CT1032', '浙CT1033', '浙CT1035', '浙CT1036', '浙CT1037', '浙CT1038', '浙CT1039', '浙CT1041', '浙CT1042', '浙CT1043', '浙CT1044', '浙CT1045', '浙CT1046', '浙CT1047', '浙CT1048', '浙CT1050', '浙CT1052', '浙CT1054', '浙CT1055', '浙CT1056', '浙CT1057', '浙CT1058', '浙CT1060', '浙CT1062', '浙CT1063', '浙CT1064', '浙CT1065', '浙CT1066', '浙CT1067', '浙CT1069', '浙CT1070', '浙CT1071', '浙CT1073', '浙CT1075', '浙CT1077', '浙CT1078', '浙CT1079', '浙CT1081', '浙CT1082', '浙CT1083', '浙CT1084', '浙CT1085', '浙CT1086', '浙CT1087', '浙CT1088', '浙CT1089', '浙CT1090', '浙CT1092', '浙CT1093', '浙CT1094', '浙CT1096', '浙CT1098', '浙CT1099', '浙CT1100', '浙CT1101', '浙CT1103', '浙CT1104', '浙CT1105', '浙CT1106', '浙CT1110', '浙CT1111', '浙CT1112', '浙CT1113', '浙CT1114', '浙CT1115', '浙CT1116', '浙CT1117', '浙CT1118', '浙CT1119', '浙CT1120', '浙CT1123', '浙CT1124', '浙CT1125', '浙CT1126', '浙CT1127', '浙CT1128', '浙CT1129', '浙CT1130', '浙CT1132', '浙CT1133', '浙CT1134', '浙CT1135', '浙CT1136', '浙CT1139', '浙CT1140', '浙CT1142', '浙CT1144', '浙CT1145', '浙CT1146', '浙CT1148', '浙CT1150', '浙CT1151', '浙CT1152', '浙CT1153', '浙CT1154', '浙CT1155', '浙CT1156', '浙CT1157', '浙CT1158', '浙CT1159', '浙CT1162', '浙CT1164', '浙CT1165', '浙CT1166', '浙CT1167', '浙CT1168', '浙CT1169', '浙CT1170', '浙CT1171', '浙CT1172', '浙CT1174', '浙CT1176', '浙CT1177', '浙CT1178', '浙CT1179', '浙CT1180', '浙CT1182', '浙CT1183', '浙CT1187', '浙CT1188', '浙CT1189', '浙CT1190', '浙CT1192', '浙CT1193', '浙CT1195', '浙CT1196', '浙CT1197', '浙CT1198', '浙CT1199', '浙CT1200', '浙CT1201', '浙CT1202', '浙CT1204', '浙CT1205', '浙CT1206', '浙CT1207', '浙CT1208', '浙CT1209', '浙CT1210', '浙CT1211', '浙CT1212', '浙CT1213', '浙CT1216', '浙CT1217', '浙CT1218', '浙CT1219', '浙CT1220', '浙CT1221', '浙CT1222', '浙CT1223', '浙CT1225', '浙CT1228', '浙CT1229', '浙CT1230', '浙CT1231', '浙CT1232', '浙CT1233', '浙CT1234', '浙CT1235', '浙CT1236', '浙CT1237', '浙CT1238', '浙CT1239', '浙CT1241', '浙CT1242', '浙CT1243', '浙CT1244', '浙CT1246', '浙CT1249', '浙CT1250', '浙CT1251', '浙CT1252', '浙CT1253', '浙CT1256', '浙CT1257', '浙CT1258', '浙CT1260', '浙CT1261', '浙CT1262', '浙CT1265', '浙CT1266', '浙CT1267', '浙CT1268', '浙CT1269', '浙CT1271', '浙CT1272', '浙CT1273', '浙CT1274', '浙CT1275', '浙CT1276', '浙CT1278', '浙CT1280', '浙CT1281', '浙CT1283', '浙CT1284', '浙CT1287', '浙CT1289', '浙CT1290', '浙CT1291', '浙CT1292', '浙CT1293', '浙CT1295', '浙CT1296', '浙CT1297', '浙CT1298', '浙CT1299', '浙CT1301', '浙CT1302', '浙CT1304', '浙CT1305', '浙CT1306', '浙CT1308', '浙CT1309', '浙CT1310', '浙CT1311', '浙CT1313', '浙CT1315', '浙CT1316', '浙CT1317', '浙CT1318', '浙CT1319', '浙CT1320', '浙CT1321', '浙CT1326', '浙CT1327', '浙CT1328', '浙CT1330', '浙CT1331', '浙CT1333', '浙CT1334', '浙CT1335', '浙CT1336', '浙CT1338', '浙CT1339', '浙CT1340', '浙CT1341', '浙CT1342', '浙CT1343', '浙CT1344', '浙CT1345', '浙CT1348', '浙CT1349', '浙CT1351', '浙CT1353', '浙CT1355', '浙CT1356', '浙CT1358', '浙CT1359', '浙CT1360', '浙CT1361', '浙CT1362', '浙CT1363', '浙CT1366', '浙CT1367', '浙CT1368', '浙CT1370', '浙CT1372', '浙CT1375', '浙CT1376', '浙CT1377', '浙CT1378', '浙CT1379', '浙CT1380', '浙CT1383', '浙CT1384', '浙CT1385', '浙CT1386', '浙CT1387', '浙CT1389', '浙CT1390', '浙CT1391', '浙CT1394', '浙CT1395', '浙CT1396', '浙CT1397', '浙CT1399', '浙CT1401', '浙CT1402', '浙CT1403', '浙CT1405', '浙CT1407', '浙CT1408', '浙CT1410', '浙CT1411', '浙CT1412', '浙CT1413', '浙CT1414', '浙CT1415', '浙CT1418', '浙CT1419', '浙CT1421', '浙CT1422', '浙CT1423', '浙CT1424', '浙CT1426', '浙CT1427', '浙CT1429', '浙CT1430', '浙CT1431', '浙CT1432', '浙CT1434', '浙CT1435', '浙CT1436', '浙CT1437', '浙CT1438', '浙CT1439', '浙CT1442', '浙CT1443', '浙CT1445', '浙CT1446', '浙CT1447', '浙CT1449', '浙CT1451', '浙CT1453', '浙CT1455', '浙CT1456', '浙CT1458', '浙CT1459', '浙CT1460', '浙CT1461', '浙CT1462', '浙CT1463', '浙CT1464', '浙CT1465', '浙CT1467', '浙CT1469', '浙CT1470', '浙CT1473', '浙CT1475', '浙CT1479', '浙CT1480', '浙CT1481', '浙CT1482', '浙CT1483', '浙CT1484', '浙CT1485', '浙CT1487', '浙CT1492', '浙CT1493', '浙CT1495', '浙CT1496', '浙CT1498', '浙CT1500', '浙CT1501', '浙CT1503', '浙CT1504', '浙CT1507', '浙CT1508', '浙CT1509', '浙CT1510', '浙CT1511', '浙CT1512', '浙CT1513', '浙CT1515', '浙CT1516', '浙CT1519', '浙CT1520', '浙CT1521', '浙CT1522', '浙CT1523', '浙CT1525', '浙CT1526', '浙CT1527', '浙CT1528', '浙CT1529', '浙CT1530', '浙CT1531', '浙CT1532', '浙CT1533', '浙CT1534', '浙CT1535', '浙CT1538', '浙CT1539', '浙CT1540', '浙CT1541', '浙CT1542', '浙CT1543', '浙CT1546', '浙CT1547', '浙CT1548', '浙CT1549', '浙CT1550', '浙CT1551', '浙CT1552', '浙CT1553', '浙CT1555', '浙CT1556', '浙CT1557', '浙CT1558', '浙CT1560', '浙CT1561', '浙CT1565', '浙CT1566', '浙CT1567', '浙CT1568', '浙CT1569', '浙CT1570', '浙CT1571', '浙CT1572', '浙CT1573', '浙CT1575', '浙CT1577', '浙CT1578', '浙CT1579', '浙CT1580', '浙CT1581', '浙CT1582', '浙CT1583', '浙CT1584', '浙CT1585', '浙CT1586', '浙CT1589', '浙CT1590', '浙CT1592', '浙CT1595', '浙CT1596', '浙CT1597', '浙CT1598', '浙CT1600', '浙CT1601', '浙CT1602', '浙CT1603', '浙CT1606', '浙CT1607', '浙CT1608', '浙CT1609', '浙CT1610', '浙CT1612', '浙CT1613', '浙CT1615', '浙CT1616', '浙CT1619', '浙CT1622', '浙CT1624', '浙CT1625', '浙CT1626', '浙CT1627', '浙CT1628', '浙CT1629', '浙CT1630', '浙CT1631', '浙CT1632', '浙CT1633', '浙CT1634', '浙CT1635', '浙CT1636', '浙CT1637', '浙CT1638', '浙CT1639', '浙CT1640', '浙CT1642', '浙CT1643', '浙CT1645', '浙CT1646', '浙CT1647', '浙CT1648', '浙CT1649', '浙CT1650', '浙CT1651', '浙CT1652', '浙CT1653', '浙CT1655', '浙CT1656', '浙CT1657', '浙CT1658', '浙CT1659', '浙CT1660', '浙CT1661', '浙CT1662', '浙CT1663', '浙CT1664', '浙CT1665', '浙CT1666', '浙CT1667', '浙CT1668', '浙CT1669', '浙CT1670', '浙CT1671', '浙CT1672', '浙CT1673', '浙CT1676', '浙CT1678', '浙CT1679', '浙CT1681', '浙CT1682', '浙CT1683', '浙CT1685', '浙CT1687', '浙CT1689', '浙CT1691', '浙CT1692', '浙CT1693', '浙CT1695', '浙CT1696', '浙CT1697', '浙CT1698', '浙CT1700', '浙CT1701', '浙CT1702', '浙CT1703', '浙CT1705', '浙CT1707', '浙CT1708', '浙CT1709', '浙CT1710', '浙CT1711', '浙CT1712', '浙CT1713', '浙CT1714', '浙CT1715', '浙CT1716', '浙CT1718', '浙CT1719', '浙CT1720', '浙CT1721', '浙CT1722', '浙CT1723', '浙CT1724', '浙CT1725', '浙CT1726', '浙CT1727', '浙CT1728', '浙CT1730', '浙CT1731', '浙CT1732', '浙CT1733', '浙CT1734', '浙CT1736', '浙CT1737', '浙CT1738', '浙CT1740', '浙CT1741', '浙CT1743', '浙CT1744', '浙CT1746', '浙CT1747', '浙CT1748', '浙CT1749', '浙CT1750', '浙CT1751', '浙CT1756', '浙CT1758', '浙CT1759', '浙CT1760', '浙CT1761', '浙CT1762', '浙CT1763', '浙CT1764', '浙CT1765', '浙CT1767', '浙CT1768', '浙CT1769', '浙CT1770', '浙CT1771', '浙CT1772', '浙CT1773', '浙CT1775', '浙CT1776', '浙CT1777', '浙CT1778', '浙CT1779', '浙CT1780', '浙CT1781', '浙CT1783', '浙CT1785', '浙CT1786', '浙CT1787', '浙CT1788', '浙CT1789', '浙CT1790', '浙CT1793', '浙CT1794', '浙CT1795', '浙CT1796', '浙CT1800', '浙CT1802', '浙CT1803', '浙CT1805', '浙CT1806', '浙CT1810', '浙CT1811', '浙CT1812', '浙CT1813', '浙CT1817', '浙CT1818', '浙CT1820', '浙CT1824', '浙CT1826', '浙CT1827', '浙CT1829', '浙CT1830', '浙CT1831', '浙CT1833', '浙CT1834', '浙CT1835', '浙CT1836', '浙CT1838', '浙CT1841', '浙CT1842', '浙CT1843', '浙CT1845', '浙CT1847', '浙CT1848', '浙CT1849', '浙CT1850', '浙CT1851', '浙CT1856', '浙CT1857', '浙CT1858', '浙CT1859', '浙CT1860', '浙CT1861', '浙CT1862', '浙CT1863', '浙CT1865', '浙CT1866', '浙CT1867', '浙CT1868', '浙CT1869', '浙CT1870', '浙CT1871', '浙CT1875', '浙CT1876', '浙CT1877', '浙CT1878', '浙CT1879', '浙CT1880', '浙CT1881', '浙CT1882', '浙CT1883', '浙CT1884', '浙CT1885', '浙CT1886', '浙CT1887', '浙CT1888', '浙CT1889', '浙CT1892', '浙CT1893', '浙CT1894', '浙CT1895', '浙CT1897', '浙CT1898', '浙CT1900', '浙CT1901', '浙CT1902', '浙CT1903', '浙CT1904', '浙CT1905', '浙CT1906', '浙CT1907', '浙CT1908', '浙CT1909', '浙CT1910', '浙CT1911', '浙CT1913', '浙CT1915', '浙CT1916', '浙CT1917', '浙CT1918', '浙CT1921', '浙CT1922', '浙CT1923', '浙CT1926', '浙CT1928', '浙CT1930', '浙CT1932', '浙CT1934', '浙CT1935', '浙CT1936', '浙CT1937', '浙CT1938', '浙CT1939', '浙CT1940', '浙CT1942', '浙CT1944', '浙CT1945', '浙CT1946', '浙CT1947', '浙CT1949', '浙CT1950', '浙CT1951', '浙CT1952', '浙CT1953', '浙CT1955', '浙CT1956', '浙CT1957', '浙CT1959', '浙CT1960', '浙CT1961', '浙CT1962', '浙CT1963', '浙CT1964', '浙CT1965', '浙CT1967', '浙CT1969', '浙CT1970', '浙CT1971', '浙CT1972', '浙CT1974', '浙CT1975', '浙CT1977', '浙CT1978', '浙CT1979', '浙CT1980', '浙CT1982', '浙CT1983', '浙CT1985', '浙CT1986', '浙CT1987', '浙CT1988', '浙CT1990', '浙CT1991', '浙CT1992', '浙CT1994', '浙CT1995', '浙CT1996', '浙CT1997', '浙CT1998', '浙CT1999', '浙CT2000', '浙CT2001', '浙CT2002', '浙CT2003', '浙CT2004', '浙CT2005', '浙CT2006', '浙CT2008', '浙CT2011', '浙CT2012', '浙CT2014', '浙CT2016', '浙CT2017', '浙CT2018', '浙CT2019', '浙CT2020', '浙CT2021', '浙CT2023', '浙CT2025', '浙CT2026', '浙CT2028', '浙CT2029', '浙CT2031', '浙CT2032', '浙CT2033', '浙CT2034', '浙CT2035', '浙CT2036', '浙CT2037', '浙CT2038', '浙CT2039', '浙CT2040', '浙CT2041', '浙CT2042', '浙CT2043', '浙CT2046', '浙CT2050', '浙CT2053', '浙CT2055', '浙CT2056', '浙CT2057', '浙CT2058', '浙CT2062', '浙CT2063', '浙CT2066', '浙CT2067', '浙CT2068', '浙CT2069', '浙CT2070', '浙CT2071', '浙CT2072', '浙CT2075', '浙CT2077', '浙CT2079', '浙CT2080', '浙CT2081', '浙CT2082', '浙CT2083', '浙CT2085', '浙CT2086', '浙CT2087', '浙CT2088', '浙CT2089', '浙CT2090', '浙CT2091', '浙CT2092', '浙CT2093', '浙CT2095', '浙CT2096', '浙CT2097', '浙CT2098', '浙CT2099', '浙CT2101', '浙CT2102', '浙CT2103', '浙CT2104', '浙CT2106', '浙CT2108', '浙CT2109', '浙CT2110', '浙CT2111', '浙CT2112', '浙CT2114', '浙CT2115', '浙CT2116', '浙CT2118', '浙CT2120', '浙CT2121', '浙CT2122', '浙CT2123', '浙CT2124', '浙CT2126', '浙CT2128', '浙CT2129', '浙CT2131', '浙CT2132', '浙CT2133', '浙CT2134', '浙CT2135', '浙CT2138', '浙CT2139', '浙CT2142', '浙CT2144', '浙CT2146', '浙CT2147', '浙CT2148', '浙CT2149', '浙CT2150', '浙CT2151', '浙CT2152', '浙CT2153', '浙CT2154', '浙CT2155', '浙CT2156', '浙CT2158', '浙CT2159', '浙CT2160', '浙CT2161', '浙CT2162', '浙CT2163', '浙CT2164', '浙CT2165', '浙CT2166', '浙CT2167', '浙CT2169', '浙CT2170', '浙CT2172', '浙CT2173', '浙CT2174', '浙CT2175', '浙CT2176', '浙CT2177', '浙CT2178', '浙CT2179', '浙CT2180', '浙CT2181', '浙CT2182', '浙CT2183', '浙CT2184', '浙CT2186', '浙CT2187', '浙CT2188', '浙CT2189', '浙CT2190', '浙CT2191', '浙CT2192', '浙CT2193', '浙CT2194', '浙CT2196', '浙CT2197', '浙CT2198', '浙CT2199', '浙CT2200', '浙CT2201', '浙CT2203', '浙CT2205', '浙CT2206', '浙CT2208', '浙CT2209', '浙CT2211', '浙CT2212', '浙CT2214', '浙CT2215', '浙CT2217', '浙CT2218', '浙CT2219', '浙CT2220', '浙CT2222', '浙CT2225', '浙CT2226', '浙CT2227', '浙CT2228', '浙CT2229', '浙CT2230', '浙CT2231', '浙CT2232', '浙CT2233', '浙CT2234', '浙CT2235', '浙CT2237', '浙CT2238', '浙CT2239', '浙CT2241', '浙CT2243', '浙CT2244', '浙CT2245', '浙CT2248', '浙CT2251', '浙CT2252', '浙CT2255', '浙CT2256', '浙CT2257', '浙CT2260', '浙CT2261', '浙CT2262', '浙CT2263', '浙CT2267', '浙CT2268', '浙CT2270', '浙CT2271', '浙CT2273', '浙CT2276', '浙CT2278', '浙CT2279', '浙CT2282', '浙CT2283', '浙CT2284', '浙CT2286', '浙CT2288', '浙CT2290', '浙CT2293', '浙CT2294', '浙CT2295', '浙CT2296', '浙CT2297', '浙CT2298', '浙CT2299', '浙CT2300', '浙CT2301', '浙CT2302', '浙CT2303', '浙CT2304', '浙CT2305', '浙CT2306', '浙CT2307', '浙CT2308', '浙CT2309', '浙CT2310', '浙CT2311', '浙CT2312', '浙CT2313', '浙CT2314', '浙CT2315', '浙CT2316', '浙CT2319', '浙CT2320', '浙CT2322', '浙CT2323', '浙CT2324', '浙CT2325', '浙CT2326', '浙CT2327', '浙CT2329', '浙CT2331', '浙CT2332', '浙CT2334', '浙CT2335', '浙CT2337', '浙CT2341', '浙CT2344', '浙CT2345', '浙CT2346', '浙CT2348', '浙CT2349', '浙CT2351', '浙CT2353', '浙CT2355', '浙CT2357', '浙CT2358', '浙CT2359', '浙CT2360', '浙CT2361', '浙CT2362', '浙CT2363', '浙CT2364', '浙CT2365', '浙CT2366', '浙CT2367', '浙CT2368', '浙CT2369', '浙CT2370', '浙CT2371', '浙CT2373', '浙CT2374', '浙CT2375', '浙CT2376', '浙CT2377', '浙CT2378', '浙CT2380', '浙CT2381', '浙CT2383', '浙CT2384', '浙CT2386', '浙CT2387', '浙CT2388', '浙CT2389', '浙CT2391', '浙CT2392', '浙CT2393', '浙CT2394', '浙CT2395', '浙CT2397', '浙CT2398', '浙CT2399', '浙CT2400', '浙CT2401', '浙CT2404', '浙CT2405', '浙CT2406', '浙CT2407', '浙CT2409', '浙CT2410', '浙CT2411', '浙CT2412', '浙CT2413', '浙CT2415', '浙CT2416', '浙CT2417', '浙CT2418', '浙CT2419', '浙CT2420', '浙CT2421', '浙CT2422', '浙CT2423', '浙CT2425', '浙CT2427', '浙CT2428', '浙CT2430', '浙CT2434', '浙CT2437', '浙CT2440', '浙CT2442', '浙CT2448', '浙CT2449', '浙CT2450', '浙CT2452', '浙CT2453', '浙CT2456', '浙CT2457', '浙CT2458', '浙CT2461', '浙CT2463', '浙CT2464', '浙CT2465', '浙CT2466', '浙CT2467', '浙CT2468', '浙CT2469', '浙CT2470', '浙CT2472', '浙CT2473', '浙CT2474', '浙CT2475', '浙CT2476', '浙CT2479', '浙CT2480', '浙CT2481', '浙CT2486', '浙CT2488', '浙CT2489', '浙CT2490', '浙CT2492', '浙CT2493', '浙CT2495', '浙CT2496', '浙CT2497', '浙CT2498', '浙CT2499', '浙CT2500', '浙CT2501', '浙CT2502', '浙CT2503', '浙CT2505', '浙CT2506', '浙CT2507', '浙CT2508', '浙CT2510', '浙CT2511', '浙CT2512', '浙CT2513', '浙CT2514', '浙CT2515', '浙CT2516', '浙CT2517', '浙CT2519', '浙CT2520', '浙CT2521', '浙CT2522', '浙CT2523', '浙CT2525', '浙CT2527', '浙CT2528', '浙CT2529', '浙CT2530', '浙CT2531', '浙CT2532', '浙CT2533', '浙CT2536', '浙CT2537', '浙CT2538', '浙CT2539', '浙CT2540', '浙CT2541', '浙CT2544', '浙CT2545', '浙CT2547', '浙CT2550', '浙CT2551', '浙CT2552', '浙CT2554', '浙CT2555', '浙CT2556', '浙CT2558', '浙CT2559', '浙CT2560', '浙CT2561', '浙CT2562', '浙CT2565', '浙CT2566', '浙CT2567', '浙CT2569', '浙CT2570', '浙CT2572']
		for (var i =0; i<taxiName.length+1; i++){
			if (i == 0){
				$("#se1").append("<option value='-1'></option>");
			}else{
				var option1 = document.createElement("option");
				$(option1).text(taxiName[i-1]);
			}		
			$('#se1').append(option1);
		}
		$(".chosen-select").chosen()
//*********************************************************************************************//
		
//***************************************选择框模式******************************************************//
		//map.dragging.disable(); map.dragging.enable();
		var latlngtran = new Latlngtransform();
		var RS_set = [];
		var index_d = [];
		$("#cli_select").on("click", function(){
			if(mode_flag == 1){
				$("#toolbar").fadeOut(500);
				d3.selectAll(".road").remove();
				$('.fl').prop("checked", false)
				$('.sp').prop("checked", false)
				if(reaceselect_flag&&show_R_flag){
					map.dragging.disable();
					$("#cli_select img").attr("src", "img/arrow2.png")
						showditu();
						select();
					reaceselect_flag = false;
				}else if(!reaceselect_flag && show_R_RS_set_flag){
					showditu();
					map.dragging.enable();
					map.off("mousedown");
					map.off("mouseup");
					map.off("mousemove");
				}else if(!reaceselect_flag && !show_R_RS_set_flag){
					map.dragging.disable();
					showditu();
					select();
				}
			};
		})
		
		$("#cli_select").on("dblclick", function(){
			cleanselect()
		})
		
		function cleanselect(){
			$("#cli_select img").attr("src", "img/arrow1.png")
			map.dragging.enable();
			map.off("mousedown");
			map.off("mouseup");
			map.off("mousemove");
			reaceselect_flag = true;
			show_R_RS_set_flag = true;
			show_R_flag = true;
			for(var j = 0; j<678; j++){
				var A = "road"+(j)
				d3.select('.'+A).remove()		
			}
			RS_set = []
			
		}
		
		function select(){
			var caldot;
			var startpoint, endpoint, rectarea;
			map.on("mousedown", function(e) {
					startpoint = e.latlng;
					map.on("mousemove", function(e) {
							$(".rect").remove();
							var bounds = [];
							endpoint = e.latlng;
							bounds.push(startpoint);
							bounds.push(endpoint);
							rectarea = L.rectangle(bounds, {color: "#0D82D7", weight:1, opacity:0.5, className:"rect"}).addTo(map);
							rectarea.on("click", function(){this.remove();});// d3.selectAll(".leaflet-marker-icon").remove();});
							caldot = rectarea.getBounds();
					});
			});
		
			map.on("mouseup", function(e) {
					$(".rect").remove();
					map.off("mousemove");
//					$('#cli_chart').css("display", "block")
					for(var i=0; i<RS_list_detial1.length; i++){
						var A = caldot.contains(latlngtran.wgs84togcj02(RS_list_detial1[i][0]));
						var A1 = caldot.contains(latlngtran.wgs84togcj02(RS_list_detial1[i][1]));
						if(A & A1){
							if(i != 464){
								RS_set.push(i+1);
							}
						}
					};
					biaoji()
					console.log(RS_set)
					draw_flow_speed()
					caldot = 0;
			});
			function biaoji(){
				for(var j = 0; j<RS_set.length; j++){
						var A = "road"+(RS_set[j]-1)
						d3.select('.'+A).data([j])
										.attr("stroke", "yellow")
										.attr("stroke-opacity", '1')
										.attr("stroke-width", '5')
										.on("click", function(d){
											d3.select(this).attr("stroke", "none")
											RS_set.splice(d,1)
											biaoji()
											draw_flow_speed()
//											console.log("去除的路名集合：", index_d)
										})
					}
			}
		};
//***************************************选择框模式******************************************************//

//***************************************根据所选道路画表******************************************************//
		var roadarea = [' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 永嘉县 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 龙湾区 ', ' 龙湾区 ', ' 永嘉县 ', ' 鹿城区 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 鹿城区 ', ' 鹿城区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 龙湾区 ', ' 龙湾区 ', ' 龙湾区 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ', ' 鹿城区 ', ' 永嘉县 ', ' 瓯海区 ', ' 瓯海区 ', ' 瓯海区 ', ' 鹿城区 ']
//		$("#cli_chart").on('click', draw_flow_speed);
		function draw_flow_speed(){
//			$("#cli_chart").css("display", "none")
			var data_road_test = [], temporset = []
			var RS_set1 = $(".D1").val()
			RS_set1 = parseInt(RS_set1.substring(8, RS_set1.length))
//			for(var i = 0; i<index_d.length; i++){
//				RS_set.splice(RS_set.indexOf(index_d[i]), 1)
//			}
			var datas, data_speed;
			var datas1 = [], data_speed1 = [];
			var data = {"x":RS_set, "y":RS_set1}
			var dom = [], dom1 = ["R214", "R215", "R216", "R220", "R222", "R208", "R138", "R144", "R145", "R293", "R295"], dom2 = ["R311", "R318", "R319", "R216", "R219", "R227", "R226", "R453", "R454", "R145", "R293", "R295"];

			var extradata = [
							[34, 31, 30, 30, 29, 31, 28, 30, 30, 32, 27, 32, 33, 33, 33, 30, 31, 30, 36, 36, 37, 40, 39, 33], //214
							[37, 36, 33, 37, 35, 34, 30, 26, 25, 30, 31, 32, 30, 30, 27, 29, 29, 28, 32, 34, 36, 37, 38, 39], //215
							[24, 24, 25, 25, 27, 27, 24, 24, 23, 20, 19, 18, 21, 19, 21, 17, 16, 16, 18, 21, 21, 22, 24, 25], //216
							[33, 31, 33, 31, 35, 36, 20, 13, 15, 25, 23, 15, 24, 23, 22, 19, 14, 10, 17, 23, 25, 29, 31, 32],//R220
							[26, 25, 25, 24, 27, 29, 22, 10, 14, 22, 20, 16, 21, 15, 20, 23, 10, 9, 14, 17, 18, 24, 23, 26], //R222
							[23, 25, 23, 23, 25, 24, 18, 11, 12, 22, 21, 17, 21, 15, 21, 23, 10, 7, 13, 17, 19, 19, 22, 24], //R208
							[26, 25, 25, 24, 27, 29, 19, 10, 13, 22, 20, 15, 21, 15, 23, 23, 11, 9, 12, 17, 18, 24, 23, 26],	//R138
							[26, 25, 25, 24, 27, 29, 21, 11, 13, 22, 22, 16, 21, 15, 20, 23, 12, 10, 15, 17, 18, 24, 23, 26],	//R144
							[23, 25, 26, 27, 27, 30, 26, 16, 20, 21, 19, 19, 21, 17, 20, 20, 13, 15, 18, 20, 20, 21, 23, 23], //145
							[27, 31, 31, 31, 29, 31, 25, 17, 19, 22, 19, 20, 19, 17, 19, 15, 15, 14, 18, 22, 22, 24, 27, 29], //293
							[28, 31, 30, 29, 29, 30, 24, 19, 21, 25, 22, 21, 22, 19, 19, 18, 16, 16, 21, 25, 23, 25, 30, 28] //295 ****16点****
							]
			var extradata1 = [
							[34, 30, 24, 27, 23, 22, 29, 32, 38, 37, 36, 38, 41, 37, 37, 36, 37, 36, 38, 41, 42, 43, 42, 44], //311
							[35, 41, 37, 25, 41, 29, 33, 35, 35, 36, 37, 35, 37, 39, 33, 30, 35, 33, 39, 33, 38, 37, 38, 39], //318
							[32, 33, 31, 30, 29, 31, 32, 32, 28, 30, 28, 29, 28, 26, 26, 28, 28, 29, 29, 29, 31, 31, 32, 33], //319
							[24, 24, 25, 25, 27, 27, 24, 24, 23, 20, 19, 18, 21, 19, 21, 17, 16, 16, 18, 21, 21, 22, 24, 25], // 216
							[29, 27, 28, 25, 31, 27, 30, 22, 22, 22, 23, 22, 20, 15, 17, 16, 17, 17, 21, 19, 20, 23, 23, 29], // 219
							[27, 28, 28, 32, 30, 24, 32, 27, 23, 22, 22, 20, 24, 20, 16, 18, 21, 24, 22, 23, 22, 26, 28, 28], //227
							[33, 36, 38, 30, 31, 39, 33, 27, 30, 21, 24, 22, 23, 26, 23, 19, 20, 25, 25, 27, 25, 29, 34, 32], //226
							[33, 36, 36, 35, 35, 36, 33, 30, 29, 27, 25, 24, 24, 24, 24, 14, 17, 24, 25, 27, 26, 30, 34, 35], // 453
							[25, 25, 23, 23, 25, 29, 23, 22, 20, 20, 16, 17, 17, 16, 15, 15, 15, 18, 17, 19, 18, 18, 24, 24], //454
							[23, 25, 26, 27, 27, 30, 26, 16, 20, 21, 19, 19, 21, 17, 20, 20, 18, 15, 18, 20, 20, 21, 23, 23], //145
							[27, 31, 31, 31, 29, 31, 25, 17, 19, 22, 19, 20, 19, 17, 19, 15, 15, 14, 18, 22, 22, 24, 27, 29], //293
							[28, 31, 30, 29, 29, 30, 24, 19, 21, 25, 22, 21, 22, 19, 19, 18, 16, 16, 21, 25, 23, 25, 30, 28] //295
							]
			var leng;
			var jsondata = JSON.stringify(data)
			for(var i = 0; i<RS_set.length; i++){
				dom.push("R"+RS_set[i]);
				temporset.push(RS_set[i])
			};
			$.ajax({
			  	type: 'post',
			  	data: jsondata,
			  	url: "http://127.0.0.1:8000/admin/post_view2.0_5/",
			  	success: function(result){
			  			datas = result.data[0];
			  			data_speed = result.data[1];
			  			console.log(data_speed, dom)
			  			console.log(result.data)
						for(pp = dom.length-1; pp>=0; pp--){
							data_road_test.push({
								'Name': dom[pp],
								'averagespeed': Math.ceil(d3.sum(data_speed[pp])/24),
								'averageflow': Math.ceil(d3.sum(datas[pp])/24),
								'V3': roadarea[temporset[pp]]
								})
						}
						$('#Msgtable0').bootstrapTable('load', data_road_test);
						$('td').css('padding','6px 4px 4px 8px');
//						console.log(data_road_test)
						chart_produce(datas,dom,data_speed);
		  		},
		  				dataType: 'JSON',
				});
				function chart_produce(datas,dom,data_speed){
					for(var i = 0; i<datas.length; i++){
						for(var j = 0; j<datas[i].length; j++){
							datas1.push(datas[i][j]);
							data_speed1.push(data_speed[i][j]);
						};
					};
//					console.log("传入的道路名称", dom)
					drawrect(datas1,dom,data_speed1, svg11);
					drawrect1(datas1,dom,data_speed1, svg12);
				};
		}
		

//***************************************根据所选道路画表******************************************************//
		
//*********************************************画出租车轨迹，动画展示************************************************//		
		function clear2(){
			d3.selectAll(".taxi").remove();
			d3.selectAll(".circle").remove();
			d3.selectAll(".nowclick").remove();
			$("#bar").fadeOut(1000)
		}

//*********************************************画出租车轨迹，动画展示************************************************//		
//*******************************************选择路段显示出租车**************************************************// 
     	function clear1(){
     		d3.selectAll(".temp").remove();
     		d3.selectAll(".temp1").remove();
     	}
   
     	var c1 = d3.rgb(255,0,0);    //红色  要改
//   	var c1 = '#a42216'
//		var c2 = '#ecd1ce';    //绿色  
//		var c1 = '#AA2839'
//		var c2 = '#95ADED';    //绿色  
		var c2 = d3.rgb(247,250,162);
		var compute = d3.interpolate(c2,c1);
			   
		
		
		//日期插件*******************************
		 $( "#datepicker1" ).datepicker({
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    defaultDate: "-4y -3m -10d",
		    dateFormat: "yy-mm-dd",
  		});
  		$( "#datepicker" ).datepicker({
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    defaultDate: "-4y -3m -10d",
		    dateFormat: "yy-mm-dd",
  		});
  		$( "#datepicker2" ).datepicker({
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    defaultDate: "-4y -3m -10d",
		    dateFormat: "yy-mm-dd",
  		});
  		$( "#datepicker3" ).datepicker({
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    defaultDate: "-4y -3m -10d",
		    dateFormat: "yy-mm-dd",
  		});
  		$( "#datepicker4" ).datepicker({
		    showOtherMonths: true,
		    selectOtherMonths: true,
		    defaultDate: "-4y -2m -10d",
		    dateFormat: "yy-mm-dd",
  		});
  		//**************************************
  		var d1, tm;
  		var co = true;
  		var flow_set = []
		var traficroad;
		var road_fist = []; 

  		$("#icon1").on("click", function(){
  			let type;
  			if(mode_flag == 1){
  				if($(".fl").is(':checked')){
  					type = "flow";
  				}else if($(".sp").is(':checked')){
  					type = "speed";
  				}
	  			var dt = $(".D1").val();
	  			var a = dt.substring(5,7)
	  			var b = dt.substring(8,10)
	  			var c = dt.substring(2,4)
	  			var e = dt.substring(0,8)
	  			var d = a;
			  	a = a + b;
			  	if(b == "01"){
			  		alert("No Yesterday!");
			  	}else{
			  		a = parseInt(a) -1;
			  		var aa = parseInt(b)-1
			  		if(aa<10){aa = "0"+ aa}else{aa = aa;};
			  		d1 = c + '/' + d + '/' + aa;
			  		aa = e + aa
			  		console.log(aa)
			  		$(".D1").val(aa);
			  		Read_data_draw(a, d1, type);
			  	}
			}
  		});
  		
  		$("#icon2").on("click", function(){
  			let type;
  			if(mode_flag == 1){
  				if($(".fl").is(':checked')){
  					type = "flow";
  				}else if($(".sp").is(':checked')){
  					type = "speed";
  				}
				console.log(type)
	  			var dt = $(".D1").val();
	  			var a = dt.substring(5,7)
	  			var b = dt.substring(8,10)
	  			var c = dt.substring(2,4)
	  			var e = dt.substring(0,8)
	  			var d = a;
			  	a = a + b;
			  	if(b == "31"){
			  		alert("No Tomorrow!");
			  	}else{
			  		a = parseInt(a) +1;
			  		var aa = parseInt(b)+1
			  		if(aa<10){aa = "0"+ aa}else{aa = aa;};
			  		d1 = c + '/' + d + '/' + aa;
			  		aa = e + aa
			  		console.log(aa)
			  		$(".D1").val(aa);
			  		Read_data_draw(a, d1, type);
			  	}
			}
  		});
  		
  		$(".sp").change(function() { 
				if($(this).is(':checked')){
					cleanselect()
					if(mode_flag == 1){
						clearplaymode()
						$('.fl').prop("checked", false)
			  			clear1();
			  			clear2();
			  			clear4();
			  			clear5();
			  			clear6();
			  			var dt = $(".D1").val();
			  			var a = dt.substring(5,7)
			  			var b = dt.substring(8,10)
			  			var c = dt.substring(2,4)
			  			var d = a;
					  	a = a + b;
					  	d1 = c + '/' + d + '/' + b;
					  	Read_data_draw(a, d1, "speed");
//					  	console.log(action)
					}
				}else{
					clearplaymode()
				};
		});
		$(".fl").change(function() { 
				if($(this).is(':checked')){
					cleanselect()
					if(mode_flag == 1){
						clearplaymode()
						$('.sp').prop("checked", false)
			  			clear1();
			  			clear2();
			  			clear4();
			  			clear5();
			  			clear6();
			  			var dt = $(".D1").val();
			  			var a = dt.substring(5,7)
			  			var b = dt.substring(8,10)
			  			var c = dt.substring(2,4)
			  			var d = a;
					  	a = a + b;
					  	d1 = c + '/' + d + '/' + b;
					  	Read_data_draw(a, d1, "flow");
					}
				}else{
					clearplaymode()
				};
		});
  		
//		$.playBar.addBar($('.test'), 60, "08:00", "09:00");//第一个参数是需要显示播放器的容器，第二个参数为时间，单位毫秒
//		$.playBar.changeBarColor("#EE927D");//设置进度条颜色
//		$.playBar.Stop();
  		function clearplaymode(){
  			d3.selectAll(".road").remove();
  			$("#toolbar").fadeOut(500);
  			clearflag();
  			flow_set = [];
  		}
  		function Read_data_draw(a, d1, type){
  			var compute, compute1, compute2, ull;
  			if(type == "flow"){
  				compute = d3.interpolate('#e9f6fa', '#076383');
  				ull = "http://127.0.0.1:8000/admin/post_view2.0_3/";
  			}else if(type == "speed"){
  				compute1 = d3.interpolate('#60CDBE', '#FDFFBF');  // 绿0  空载率最大        黄1 空载率中等
				compute2 = d3.interpolate('#AA1B27', '#FDFFBF');   //红0  空载率最小        黄1 空载率中等
				ull = "http://127.0.0.1:8000/admin/post_view2.0_3_1/";
  			}
			$.playBar.restTime(tm);
		  	clearflag();
		  	d3.selectAll(".road").remove();
		  	flow_set = [];
			$("#map").loading({});
  			var tm1 = $("#time1").val(), tm2 = $("#time2").val(), tm111 = $("#time1").val().substring(0, 5), tm222 = $("#time2").val().substring(0, 5);
  			var tm11 = parseInt(tm1.substring(0,2)), tm12 = parseInt(tm1.substring(3,5));
			var tm21 = parseInt(tm2.substring(0,2)), tm22 = parseInt(tm2.substring(3,5));
			tm1 = tm11 * 60 + tm12;
			tm2 = tm21 * 60 + tm22;
			tm = tm2 -tm1;
			var data = {"x":a, "y":tm1, "z":tm2}
			var jsondata = JSON.stringify(data)
				$.ajax({
				  	type: 'post',
				  	data: jsondata,
				  	url: ull,
				  	success: function(result){
				  		if(result.code == 0){
				  			removeLoading('loadingName');
				  			$("#toolbar").fadeIn(500);
				  			$("#pop2").html(d1 + '<br/>' + tm111)
				  		}
				  		flow_set = result.data;
//				  		console.log(flow_set)
				  		road_fist = result.data[0];
				  		draw_road_fist(road_fist, type);
				  		traficroad = d3.selectAll(".road")
			  		},
			  		dataType: 'JSON',
				});
				$.playBar.addBar($('.test'), tm, tm111, tm222);//第一个参数是需要显示播放器的容器，第二个参数为时间，单位毫秒
				$.playBar.changeBarColor("#EE927D");//设置进度条颜色
				$.playBar.Stop();
//							$("#toolbar").css("top", $("#map").height()-28)
				$("#pop").css("top", $("#map").height()-21)
				$(".TimeBall").mouseover(function(){
											$("#pop").show();
										})
							  .mouseout(function(){
											$("#pop").hide();
										})
							  .mousemove(function(){
							  				let linear, linear1, linear2, color, middlevalue;
							  				var p = $(".BarBeginTime").html(), p1 = $("#time1").val().substring(0, 5);
											var b = p.substring(0, 2), b1 = p1.substring(0, 2);
											var c = p.substring(3, 5), c1 = p1.substring(3, 5);
											var d = parseInt(b) * 60 + parseInt(c)-(parseInt(b1) * 60 + parseInt(c1));
											console.log(d)
											console.log(flow_set[d])
//											middlevalue = d3.min(flow_set[d])+(d3.max(flow_set[d])-d3.min(flow_set[d]))/2
											middlevalue = 28;
								  			if(type == "flow"){
								  				linear = d3.scaleLinear()  
												           .domain([d3.min(flow_set[d]),d3.max(flow_set[d])])  
												           .range([0,1]);
								  			}else if(type == "speed"){
								  				linear1 = d3.scaleLinear()  
												           .domain([d3.max(flow_set[d]), middlevalue])  
												           .range([0,1]);
												linear2 = d3.scaleLinear()  
												           .domain([d3.min(flow_set[d]), middlevalue])  
												           .range([0,1]);
								  			}
											var a = traficroad.data(flow_set[d]).attr("stroke", function(d, i){
//												var t = compute(linear(d));
												if(type == "flow"){
														color = compute(linear(d))
												}else if(type == "speed"){
													if(d>middlevalue){
														color = compute1(linear1(d))
													}else{
														color = compute2(linear2(d))
													}
												}
												return color
											});
							  })
			console.log(action)		
			if(!action){
				action = true;
				$("#i3").removeClass("fa-pause").addClass("fa-play").attr("title", "Play").css("left", "1.5px");
			};
			$("#pop").css("left", "144px");
			var p = $(".BarBeginTime").html();
			$("#pop2").html(d1 + '<br/>' + tm111)
			$("#icon").off("click").on("click", function(){
						if(action){
							$.playBar.Begin();
							fg = setInterval(donghua, 1000);
							action = false;
							$("#i3").removeClass("fa-play").addClass("fa-pause").attr("title", "Pause").css("left", "0px");
							
						}else if(!action){
							$.playBar.Stop();
							clearflag();
							action = true;
							$("#i3").removeClass("fa-pause").addClass("fa-play").attr("title", "Play").css("left", "1.5px");
						}
			});
			function donghua(){
				console.log("donghua")
				let linear, linear1, linear2, color, middlevalue;
				var left = $(".TimeBall").position().left+143.5;
				left = left + "px";
				$("#pop").css("left",left);
				var p = $(".BarBeginTime").html(), p1 = $("#time1").val().substring(0, 5);
				var b = p.substring(0, 2), b1 = p1.substring(0, 2);
				var c = p.substring(3, 5), c1 = p1.substring(3, 5);
				var d = parseInt(b) * 60 + parseInt(c)-(parseInt(b1) * 60 + parseInt(c1));

				middlevalue = 28;
	  			if(type == "flow"){
	  				linear = d3.scaleLinear()  
					           .domain([d3.min(flow_set[d]),d3.max(flow_set[d])])  
					           .range([0,1]);
	  			}else if(type == "speed"){
	  				linear1 = d3.scaleLinear()  
					           .domain([d3.max(flow_set[d]), middlevalue])  
					           .range([0,1]);
					linear2 = d3.scaleLinear()  
					           .domain([d3.min(flow_set[d]), middlevalue])  
					           .range([0,1]);
	  			}
				$("#pop2").html(d1 + '<br/>' + p)
				var a = traficroad.data(flow_set[d]).attr("stroke", function(d, i){
//					var t = compute(linear(d)); 
					if(type == "flow"){
							color = compute(linear(d))
					}else if(type == "speed"){
						if(d>middlevalue){
							color = compute1(linear1(d))
						}else{
							color = compute2(linear2(d))
						}
					}
					return color
				});
			}
			
	  		function draw_road_fist(A, type){
	  			let linear, linear1, linear2, color, middlevalue;
	  			var res_carflow = A
//	  			middlevalue = d3.min(res_carflow)+(d3.max(res_carflow)-d3.min(res_carflow))/2
	  			middlevalue = 28;
	  			if(type == "flow"){
	  				linear = d3.scaleLinear()  
					           .domain([d3.min(res_carflow),d3.max(res_carflow)])  
					           .range([0,1]);
	  			}else if(type == "speed"){
	  				linear1 = d3.scaleLinear()  
					           .domain([d3.max(res_carflow), middlevalue])  
					           .range([0,1]);
					linear2 = d3.scaleLinear()  
					           .domain([d3.min(res_carflow), middlevalue])  
					           .range([0,1]);
	  			}
				var jj = 2.5
				for(let j = 0; j<RS_list.length; j++){
					if(j != 464){
						if(type == "flow"){
							color = compute(linear(res_carflow[j]))
						}else if(type == "speed"){
							if(res_carflow[j]>middlevalue){
								color = compute1(linear1(res_carflow[j]))
							}else{
								color = compute2(linear2(res_carflow[j]))
							}
						}
				  		if(RS_list[j].length == 4){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][3].lat),parseFloat(RS_list[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  					    .addTo(map);
				  		}else if(RS_list[j].length == 3){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}
					}
				}
	  		}
  		}
  		
  		//*******************************************设置播放器**************************************************//	
  		
  		function clear3(){
  			clearflag();
			d3.selectAll(".road").remove();
			flow_set = [];
			$("#toolbar").fadeOut(500);
  		}
  		function clearflag(){
			window.clearInterval(fg);
		}
  		
//*******************************************显示所有路段和路口节点**************************************************//	
		var show_R_flag = true, show_R_RS_set_flag = true;
//		$("#show_R").on("click", 
		function showditu(){
				if(show_R_flag){
					console.log("haha")
					show_R_flag = false;
					let jj = 4;
					let color = "#D6D3D3"
					for(let j = 0; j<RS_list.length; j++){
						if(j != 464){
					  		if(RS_list[j].length == 4){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][3].lat),parseFloat(RS_list[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
					  					    .addTo(map);
					  		}else if(RS_list[j].length == 3){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
					  						.addTo(map);
					  		}else{
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
					  						.addTo(map);
					  				}
						}
					}
				}else{
					if(show_R_RS_set_flag){
						for(var j=1; j<679; j++){
							if(!RS_set.includes(j)){
								let A = "road"+(j-1)
								d3.select('.'+A).attr("stroke", 'none')
							}
						}
						show_R_RS_set_flag = false;
					}else{
						for(var j=1; j<679; j++){
							if(!RS_set.includes(j)){
								let A = "road"+(j-1)
								d3.select('.'+A).attr("stroke", '#D6D3D3')
												.attr("stroke-width", '2.5')
							}
						}
						show_R_RS_set_flag = true;
					}
				}
				
		}
//		);
		
		function redraw(a, b){
			var dt = [];
				for(let i = 0; i<RS.length; i++){
				  		dt.push(RS[i].R);
				  	}
				let jj = b;
				for(let j = 0; j<dt.length; j++){
				  		if(dt[j].length == 4){
				  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)], [parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)], [parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)]], {color: 'red', opacity: 1, weight: jj, className: 'road'+j})
				  					    .addTo(map);
				  		}else if(dt[j].length == 3){
				  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)], [parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]], {color: 'red', opacity: 1, weight: jj, className: 'road'+j})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]], {color: 'red', opacity: 1, weight: jj, className: 'road'+j})
				  						.addTo(map);
				  				}
				  			}
				for (let i=0; i<road_point.length; i++){
					L.circle(road_point[i],{
				        	color: 'white',//颜色
				            fillColor: '#14CA82',
				            fillOpacity: 1,//透明度
				            opacity: 1,
				            weight: a,
				            radius: 0,//25,
				            className: 'circle0'
				        	}).addTo(map)
				   }
		}
		
		function clear5(){
			for(let i = 0; i<678; i++ ){
						d3.select(".road"+i).remove();
					}
					d3.selectAll(".circle0").remove();
			honeySwitch.showOff("#show_R")
			show_R_flag = true;
		}
		
		function clear5_1(){
			for(let i = 0; i<678; i++ ){
						d3.select(".road"+i).remove();
					}
			d3.selectAll(".circle0").remove();
		}
			

//*********************************************************************************************//				
  		
		
		var wi = 550; //1101;
		var he = 275, he1 = he+25
		var y_st = 0;
		var y_ed = 5;
		$("#left_board").height(he1);
		$("#right_board").height(he1);
		
		
//*******************************************chart3流量速度等表格**************************************************//
		
		var don_x = []
		for(let i = 0; i<25; i++){
			don_x.push(i+'H')
		}
		var padding = {top: 10, right: 50, bottom: 23, left: 10};
		var xAxisWidth = wi-padding.left-padding.right;
		var yAxisWidth = he-padding.bottom-padding.top;
		
		
		var svg1 = d3.select("#body_svg").append("svg")
					.attr("width", wi)
					.attr("height", 25)
					.attr("class", "svg1")
					
		var svg1_1 = d3.select("#body_svg").append("svg")
					.attr("width", wi)
					.attr("height", 25)
					.attr("class", "svg1_1")
				               
		
		var xScale = d3.scaleLinear()
		               .domain([0, 24])
		               .range([0, xAxisWidth])
		               
		var xAxis = d3.axisBottom(xScale)
		              .ticks(13)
		              
		
		var gX = svg1.append("g")
		            .attr("transform","translate("+padding.left+","+(1.5)+")")
		            .attr("class","gx")
		            .call(xAxis)
		            
		var gX = svg1_1.append("g")
		            .attr("transform","translate("+padding.left+","+(1.5)+")")
		            .attr("class","gx1")
		            .call(xAxis)
		var svg11 = d3.select("#hdiv").append("svg")
						  .attr("width", 493)
						  .attr("height", 235)
						  .attr("class", "svg11")
		var svg12 = d3.select("#hdiv1").append("svg")
						  .attr("width", 493)
						  .attr("height", 235)
						  .attr("class", "svg12")
//		var gY = svg.append("g")
//		            .attr("transform","translate("+padding.left+","+(he-yAxisWidth-padding.bottom)+")")
//		            .attr("class", "gy")
//		            .call(yAxis);
//		
//		
//		gY.selectAll("text")
//		  .attr('transform', 'rotate(-30)')
//*******************************************画分割线**************************************************//
//*********************************************************************************************//

//*******************************************画方块**************************************************//
		function drawrect(dataset,dom, data_speed, svg){
			
			clearsvg11();
			var datalog = []
			for(var i = 0; i<data_speed.length; i++){
				if(data_speed[i]==0){
					datalog.push(Math.log(1))
					console.log(Math.log(1))
				}else{
					datalog.push(Math.log(data_speed[i]))
				}
			}
			
			var c3 = d3.rgb(57,229,28), c4 = d3.rgb(229,62,28);  //红色  要改
			var max_speed = d3.max(datalog), min_speed = 1.945//d3.min(datalog);
//			console.log(min_speed)
			var max_realspeed = d3.max(data_speed), min_realspeed = d3.min(data_speed);
//			var compute1 = d3.interpolate(c2,c1);
			var svg11height, rectHeight = 10;
			if(dom.length*rectHeight>235){
				svg11height = dom.length*rectHeight
			}else{
				svg11height = 235
			}
			d3.select('.svg11').attr("height", svg11height)
//			var compute1 = d3.interpolate('#4360AD', '#DEB3AB');
//			var compute2 = d3.interpolate('#BB414F', '#DEB3AB');
//			var compute1 = d3.interpolate('#AA1B27', '#FDFFBF');
			var compute1 = d3.interpolate('#60CDBE', '#FDFFBF');
			var compute2 = d3.interpolate('#AA1B27', '#FDFFBF');
//			var linear1 = d3.scaleLinear()  
//				           .domain([min_speed, max_speed])  
//				           .range([0, 1]);
			var linear1 = d3.scaleLinear()  
				           .domain([max_speed, min_speed+(max_speed-min_speed)/2])  
				           .range([0, 1]);
			var linear2 = d3.scaleLinear()  
				           .domain([min_speed, min_speed+(max_speed-min_speed)/2])  
				           .range([0, 1]);	
				           
			var colorSpeed = d3.scaleQuantize()
						  .domain([0, 1])
//						  .range(["#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]);
						  .range(["#F5EB9D", "#F6CB8C", "#F6BC83", "#F49D73", "#F06755", "#E72926"]);
//						  .range(["#4360AD", "#7799D0", "#93B0DD", "#E0AEA3", "#DB796F", "#D6726C", "#BB414F"]);
			
			var yScale = d3.scaleBand()
			               .domain(dom)
			               .range([yAxisWidth, 0])
			               
					  
			var xScale = d3.scaleLinear()
		               .domain([0, 24])
		               .range([0, xAxisWidth])
		               
			var xAxis = d3.axisBottom(xScale)
			              .ticks(13)
			
			var rectWidth = xScale(1) - xScale(0); //矩形高
			
			function draw_segline(don, H, svg){
				var base_y = padding.top+0.5;
				for(var i = 0; i<don.length; i++){
					var line = svg.append("line")
								  .attr("x1", 0)
								  .attr("y1", i*H)
								  .attr("x2", xAxisWidth)
								  .attr("y2",  i*H)
								  .attr("stroke", "gray")
								  .attr("class", "line1")
				};
			};			
			
			var min = d3.min(dataset), max = d3.max(dataset);
			var dscale = d3.scaleLinear()
			               .domain([min,max])
			               .range([0, rectWidth])
			var g = svg.append("g");
			var colorset = ["#65AC50", "#CAE081", "#FDCD8E", "#F5814E", "#BD2019"]
			
			var rect = g.selectAll(".rect1")
						  .data(dataset)
						  .enter()
						  .append("rect")
						  .attr("fill", function(d,i){
						  	if(data_speed[i]==0){
						  		return "black"
						  	}else{
						  		if(datalog[i]> min_speed+(max_speed-min_speed)/2){
						  			return compute1(linear1(datalog[i]))
						  		}else{
						  			return compute2(linear2(datalog[i]))
						  		}
//						  		return compute1(linear1(datalog[i])) //红色  要改
						  	}
						  })
						  .attr("x", function(d,j){
						  		return (j%24)*(rectWidth)
						  })
						  .attr("y", function(d, i){
						  	return svg11height-rectHeight- parseInt(i/24)*rectHeight
						  })
						  .attr("height", rectHeight)
						  .attr("width", rectWidth)
						  .attr("class", "rect1")
						  .attr("stroke-width", "2")
						  .on("mouseover", function(){
						  	d3.select(this).attr("stroke-width", "2")
						  				   .attr("stroke", "black")
						   	  tooltip.attr("height", H_tool)
						   	         .style("opacity", 1.0);
						   	  d3.select(".tooltip1").attr("height", H_tool)
						   	         				.style("opacity", 1.0);
						   })
						   .on("mouseout", function(){
						   	  d3.select(this).attr("stroke-width", "0")
						   	  tooltip.style("opacity", 0.0)
						   	  		 .style("left", "0px")
			            	       	 .style("top", "-200px");
			            	  d3.select(".tooltip1").style("opacity", 0.0)
										   	  		.style("left", "0px")
							            	       	.style("top", "-200px");
						   	  d3.select('.'+A_last).attr("stroke-opacity", '1')
												   .attr("stroke-width", '5')
							  d3.selectAll(".rect2").attr("stroke-width", "0")
						   	  
						   })
						   .on("mousemove", mousemove);
			recthaha();
						   
	        /***********************************************显示信息更友善***********************************************/
	       	var flow = [];
	       	for(var i = 0; i<24; i++){
	       		flow[i] = [];
	       		for(var j = dom.length-1; j >= 0; j--){
		       		flow[i].push({roadname: dom[j],
	            		       value:dataset[24*j+i],
	            		       speed:data_speed[24*j+i]
	            		     })
	       		};
	       	};
			var tooltip = d3.select("#body_svg")
                            .append("div")
                            .attr("class","tooltip")
                            .style("opacity",0)
                            .style("left", "0px")
			            	.style("top", "-200px");
            var title = tooltip.append("div")
                               .attr("class", "title");
            var des_body = tooltip.append("div")
                               .attr("class", "des_body");
            var des = des_body.selectAll(".des")
                              .data(dom)
                              .enter()
                              .append("div")
                              .attr("class", "des");
            var desText = des.append("div")
                              .attr("class", "desText");
            
            var H_tool = (dom.length+1)*30 + 9;
            var A_last;
          
			 
			function change(){

			}
			
			function draw_children(A, B, C){

		    }
			
			function mousemove(){
				var h1 = $("#map").height(), h2 = $("#gongjulan").height(), h3 = H_tool;
				var data1 = dataset;
				var doma = dom;
				var mouseX = d3.mouse(this)[0] ;
            	var mouseY = d3.mouse(this)[1] ;
            	var x0 = xScale.invert( mouseX );
            	var y0 = mouseY;
            	var y00 = yAxisWidth/doma.length
            	var y01, y02;
            	x0 = Math.floor(x0);
            	var thisattribute = d3.select(this)._groups[0][0].attributes
            	if(svg11height == 235){
            		y01 = Math.floor((parseInt(thisattribute.y.value)-svg11height+rectHeight+(doma.length-1)*rectHeight)/rectHeight)
            		y02 = doma[doma.length-1-y01]
            	}else{
            		y01 = Math.floor(parseInt(thisattribute.y.value)/rectHeight)
            		y02 = doma[doma.length-1-y01]
            	}
            	hightlight(y02);
//          	console.log(thisattribute.y.value)
				var allrect2 =  d3.selectAll(".rect2"), allrect1 =  d3.selectAll(".rect1");
				for(var zz = 0; zz<allrect2.size(); zz++){
					if(parseFloat(allrect2._groups[0][zz].attributes.x.value) == parseFloat(thisattribute.x.value) && parseFloat(allrect2._groups[0][zz].attributes.y.value) == parseFloat(thisattribute.y.value)){
						d3.select(allrect2._groups[0][zz]).attr("stroke-width", "2")
						  				   				  .attr("stroke", "black")
						d3.select(allrect1._groups[0][zz]).attr("stroke-width", "2")
						  				   				  .attr("stroke", "black")
					}else{
						d3.select(allrect2._groups[0][zz]).attr("stroke-width", "0")
						d3.select(allrect1._groups[0][zz]).attr("stroke-width", "0")
					}
				}
            	var x1;
            	if(x0<9){x1 = "0"+(x0);}else{x1 = x0};
            	var data = [];
            	for(var i = 0; i<parseInt((data1.length)/24); i++){
            		data.push(i*24+x0)
            	}
            	title.html("<strong>Speed("+ x1 +"H)</strong>")
            	d3.select(".title1").html("<strong>Flow("+ x1 +"H)</strong>")
            	var hahaha = d3.selectAll(".des_body .des")
            	var hahahatooltip1 = d3.selectAll(".des_body1 .des1")
            	var hahaha1 = d3.selectAll("#MsgAccordion1 tbody tr")
            	for(var pp = 0; pp < hahaha.size(); ++pp){
            		if(pp == y01){
            			let scoTop = d3.select(hahaha._groups[0][pp])._groups[0][0].offsetTop;
            			let scoTop1 = d3.select(hahahatooltip1._groups[0][pp])._groups[0][0].offsetTop;
            			d3.select(hahaha._groups[0][pp]).style("background", "#D3D3D3")
            			$(".des_body").scrollTop(scoTop);
//          			if(scoTop>100){
//							$("#des_body").scrollTop(scoTop-100)
//						}else{
//							$("#des_body").scrollTop($("#des_body").scrollTop()-18)
//						}
//          			$("#hdiv1").scrollTop(scoTop);
						if(scoTop>$("#hdiv1").height()){
							$("#hdiv1").scrollTop(scoTop-$("#hdiv1").height())
						}else{
							$("#hdiv1").scrollTop($("#hdiv1").scrollTop()-18)
						}
//          			console.log(scoTop, $(".des_body").scrollTop(), $(".des_body").height())
            			d3.select(hahahatooltip1._groups[0][pp]).style("background", "#D3D3D3")
            			$(".des_body1").scrollTop(scoTop1);
            		}else{
            			d3.select(hahaha._groups[0][pp]).style("background", "#FFFFFF")
            			d3.select(hahahatooltip1._groups[0][pp]).style("background", "#FFFFFF")
            		}
            	}
            	for(var qq = 0; qq < hahaha1.size()-1; ++qq){
            		if(qq == y01){
            			let scoTop = d3.select(hahaha1._groups[0][qq])._groups[0][0].offsetTop;
            			d3.select(hahaha1._groups[0][qq]).style("background-color", "#D3D3D3")
//          			d3.select(d3.select(hahaha1._groups[0][qq])._groups[0][0].cells)._groups[0][0].style("color", "#white")
            			$("#MsgAccordion1").scrollTop(scoTop);
            		}else{
            			d3.select(hahaha1._groups[0][qq]).style("background-color", "#FFF")
            		}
            	}
            	desText.html(function(d,i){
            		let x11;
            		if(flow[x0][i].speed < 10){
            			x11 = "0"+flow[x0][i].speed 
            		}else{
            			x11 = flow[x0][i].speed
            		}
					return "<strong>"+flow[x0][i].roadname+"</strong>"+ "　" + "<strong>"+ x11 +"</strong>"
            	});
            	
            	if(mode_flag == 1 || mode_flag == 2){
	            	for(var k = 0; k<flow[x0].length; k++){
	            		let newname = "road"+ String(parseInt(flow[x0][k].roadname.substring(1, flow[x0][k].roadname.length))-1), cc;
	//          		d3.select("."+ newname).attr("stroke", compute1(linear1(flow[x0][k].speed)));  //红色  要改
						let qff;
	        			if(flow[x0][k].speed == 0){
	        				qff = Math.log(1)
	        			}else{
	        				qff = Math.log(flow[x0][k].speed)
	        			}
	            		if(qff>min_speed+(max_speed-min_speed)/2){
				  			cc =  compute1(linear1(qff))
				  		}else{
				  			cc =  compute2(linear2(qff))
				  		}
				  		d3.select("."+ newname).attr("stroke", cc);
	//			  		d3.select("."+ newname).attr("stroke", compute1(linear1(qff)));
	            	}
	           }
            	d3.selectAll(".desText1").html(function(d,i){
				            		let x11;
				            		if(flow[x0][i].value < 10){
				            			x11 = "00"+flow[x0][i].value 
				            		}else if(flow[x0][i].value < 100){
				            			x11 = "0"+flow[x0][i].value
				            		}else{
				            			x11 = flow[x0][i].value
				            		}
									return "<strong>"+flow[x0][i].roadname+"</strong>"+ "　" + "<strong>"+ x11 +"</strong>"
				            	});
            	var top_d, tooltip1top_d, left_d, tooltip1left_d;
            	if(d3.event.pageY >= 663){
            		top_d = 76
            	}else{
            		top_d = d3.event.pageY-h1+5;
            	}
            	if(d3.event.pageX >= 707){
            		left_d = d3.event.pageX-400-$(".tooltip").width();
            		tooltip1left_d = left_d + 570;
            	}else{
            		left_d = d3.event.pageX-330;
            		tooltip1left_d = left_d+580;
            	}
            	let heightdesbody, heightdesbody1;
            	if(doma.length>9){
            		heightdesbody = 162;
            	}else{
            		heightdesbody = doma.length * 18;
            	}
            	tooltip.style("left", left_d + "px")
            	       .style("top", (top_d-10) + "px")
            	       .style("height", (heightdesbody + 22) + "px");
            	des_body.style("height", heightdesbody+"px")
            	d3.select(".tooltip1").style("left", tooltip1left_d + "px")
            	       				  .style("top", (top_d-10) + "px")
            	       				  .style("height", (heightdesbody + 20) + "px");
            	d3.select(".des_body1").style("height", heightdesbody+"px")
            	
			};
			function hightlight(A){
				A = A.substring(1,A.length);
				A = 'road'+(parseInt(A)-1)
				if(A_last == A){
					d3.select('.'+A).attr("stroke-opacity", '1')
									.attr("stroke-width", '15')
				}else{
					d3.select('.'+A).attr("stroke-opacity", '1')
									.attr("stroke-width", '5')
					d3.select('.'+A_last).attr("stroke-opacity", '1')
									.attr("stroke-width", '5')
				}
				
				A_last = A;
			}
			function recthaha(){
				var colorDiv = d3.select("#body_svg").append("div")
						                 .attr("class", "colorDiv")
						                 .style('background', "linear-gradient(to bottom, #60CDBE, #FDFFBF, #AA1B27)")  //红色  要改
//						                 .style('background', "linear-gradient(to bottom, #1a9850, #66bd63, #a6d96a, #d9ef8b, #ffffbf, #fee08b, #fdae61, #f46d43, #d73027, #a50026)")
				var colorp = d3.select("#body_svg").append("p")
										.attr("class", "colorp1")
				var colorp1 = d3.select("#body_svg").append("p")
										.attr("class", "colorp11")
				var colorp2 = d3.select("#body_svg").append("p")
										.attr("class", "colorp12")
				colorp.html("<b>"+ max_realspeed +"</b>")
				colorp1.html("<b>"+ min_realspeed +"</b>")
				colorp2.html("<b>car</b>")
				}
		};
		
//		d3.select('.svg1').attr("height", 1000)
		function drawrect1(dataset,dom, data_speed, svg){
			
			clearsvg21();
			var min_flow = d3.min(dataset), max_flow = d3.max(dataset);
			var c3 = d3.rgb(3,149,240), c4 = d3.rgb(188,229,252);  //红色  要改
			var max_speed = d3.max(data_speed), min_speed = d3.min(data_speed);
//			var compute1 = d3.interpolate(c3,c4); 
			var svg11height, rectHeight = 10;
			if(dom.length*rectHeight>235){
				svg11height = dom.length*rectHeight
			}else{
				svg11height = 235
			}
			d3.select('.svg12').attr("height", svg11height)
			var compute1 = d3.interpolate('#076383','#e9f6fa'); 
			var linear1 = d3.scaleLinear()  
				           .domain([max_flow, min_flow])  
				           .range([0,1]);
				           
			var colorFlow = d3.scaleQuantize()
						  .domain([0, 1])
						  .range(["#002766", "#003A8C", "#0050B3", "#096DD9", "#1890FF", "#40A9FF", "#69C0FF", "#91D5FF", "#BAE7FF"]);
			
			var yScale = d3.scaleBand()
			               .domain(dom)
			               .range([yAxisWidth, 0])
			               
					  
			var xScale = d3.scaleLinear()
		               .domain([0, 24])
		               .range([0, xAxisWidth])
		               
			var xAxis = d3.axisBottom(xScale)
			              .ticks(13)
						
			var rectWidth = xScale(1) - xScale(0); //矩形高度
						
			
			var g = svg.append("g");
			var rect = g.selectAll(".rect2")
						  .data(dataset)
						  .enter()
						  .append("rect")
						  .attr("fill", function(d,i){
						  	if(d==0){
						  		return "black"
						  	}else{
						  		return compute1(linear1(d))  //红色  要改
						  	}
						  })
						  .attr("x", function(d,j){
//						  		return padding.left+0.5 
						  		return  (j%24)*rectWidth
						  })
						  .attr("y", function(d, i){
//						  	return padding.top+0.5 + rectHeight * (dom.length-1) 
						  	return svg11height-rectHeight- parseInt(i/24)*rectHeight
						  })
						  .attr("height", rectHeight)
						  .attr("width", rectWidth)
						  .attr("class", "rect2")
						  .on("mouseover", function(){
						  	d3.select(this).attr("stroke-width", "2")
						  				   .attr("stroke", "black")
						   	  tooltip1.attr("height", H_tool)
						   	         .style("opacity", 1.0);
						   	  d3.select(".tooltip").attr("height", H_tool)
						   	         				.style("opacity", 1.0);
						   })
						   .on("mouseout", function(){
						   	  d3.select(this).attr("stroke-width", "0")
						   	  tooltip1.style("opacity", 0.0)
						   	  		 .style("left", "0px")
			            	       	 .style("top", "-200px");
			            	  d3.select(".tooltip").style("opacity", 0.0)
										   	  	   .style("left", "0px")
							            	       .style("top", "-200px");
						   	  d3.select('.'+A_last).attr("stroke-opacity", '1')
												   .attr("stroke-width", '5')
							  d3.selectAll(".rect1").attr("stroke-width", "0")
						   	  
						   })
						   .on("mousemove", mousemove);;
						  

			recthaha();
						   
	        /***********************************************显示信息更友善***********************************************/
	       	var flow = [];
	       	for(var i = 0; i<24; i++){
	       		flow[i] = [];
	       		for(var j = dom.length-1; j >= 0; j--){
		       		flow[i].push({roadname: dom[j],
	            		       value:dataset[24*j+i],
	            		       speed:data_speed[24*j+i]
	            		     })
	       		};
	       	};
			var tooltip1 = d3.select("#body_svg")
                            .append("div")
                            .attr("class","tooltip1")
                            .style("opacity",0)
                            .style("left", "0px")
			              	.style("top", "-200px");
            var title = tooltip1.append("div")
                               .attr("class", "title1");
            var des_body1 = tooltip1.append("div")
                               .attr("class", "des_body1");
            var des1 = des_body1.selectAll(".des1")
                              .data(dom)
                              .enter()
                              .append("div")
                              .attr("class", "des1");
            var desText = des1.append("div")
                              .attr("class", "desText1");
            
            var H_tool = (dom.length+1)*30 + 9;
            var A_last;
            
          	
			 
			function change(){
		        
			}
			
			function mousemove(){
				
				var h1 = $("#map").height(), h2 = $("#gongjulan").height(), h3 = H_tool;
				var data1 = dataset;
				var doma = dom;
				var mouseX = d3.mouse(this)[0];
            	var mouseY = d3.mouse(this)[1];
//          	console.log([d3.event.pageX, d3.event.pageY], [mouseX, mouseY])
            	var x0 = xScale.invert( mouseX );
            	var y0 = mouseY;
            	var y00 = yAxisWidth/doma.length
            	var y01, y02;
            	x0 = Math.floor(x0);
            	var thisattribute = d3.select(this)._groups[0][0].attributes
            	if(svg11height == 235){
            		y01 = Math.floor((parseInt(thisattribute.y.value)-svg11height+rectHeight+(doma.length-1)*rectHeight)/rectHeight)
            		y02 = doma[doma.length-1-y01]
            	}else{
            		y01 = Math.floor(parseInt(thisattribute.y.value)/rectHeight)
            		y02 = doma[doma.length-1-y01]
            	}
            	hightlight(y02);
				var allrect2 =  d3.selectAll(".rect1"), allrect1 =  d3.selectAll(".rect2");
				for(var zz = 0; zz<allrect2.size(); zz++){
					if(parseFloat(allrect2._groups[0][zz].attributes.x.value) == parseFloat(thisattribute.x.value) && parseFloat(allrect2._groups[0][zz].attributes.y.value) == parseFloat(thisattribute.y.value)){
						d3.select(allrect2._groups[0][zz]).attr("stroke-width", "2")
						  				   				  .attr("stroke", "black")
						d3.select(allrect1._groups[0][zz]).attr("stroke-width", "2")
						  				   				  .attr("stroke", "black")
					}else{
						d3.select(allrect2._groups[0][zz]).attr("stroke-width", "0")
						d3.select(allrect1._groups[0][zz]).attr("stroke-width", "0")
					}
				}
            	var x1;
            	if(x0<9){x1 = "0"+(x0);}else{x1 = x0};
            	title.html("<strong>Flow("+ x1 +"H)</strong>")
            	d3.select(".title").html("<strong>Speed("+ x1 +"H)</strong>")
            	var data = [];
            	for(var i = 0; i<parseInt((data1.length)/24); i++){
            		data.push(i*24+x0)
            	}
            	
            	desText.html(function(d,i){
            		let x11;
            		if(flow[x0][i].value < 10){
            			x11 = "00"+flow[x0][i].value 
            		}else if(flow[x0][i].value < 100){
            			x11 = "0"+flow[x0][i].value
            		}else{
            			x11 = flow[x0][i].value
            		}
					return "<strong>"+flow[x0][i].roadname+"</strong>"+ "　" + "<strong>"+ x11 +"</strong>"
            	});
            	if(mode_flag == 1 || mode_flag == 2){
	            	for(var k = 0; k<flow[x0].length; k++){
	            		let newname = "road"+ String(parseInt(flow[x0][k].roadname.substring(1, flow[x0][k].roadname.length))-1)
	            		d3.select("."+ newname).attr("stroke", compute1(linear1(flow[x0][k].value)));  //红色  要改
	            	}
	            }
	        	d3.selectAll(".desText").html(function(d,i){
	        		let x11;
	        		if(flow[x0][i].speed < 10){
	        			x11 = "0"+flow[x0][i].speed 
	        		}else{
	        			x11 = flow[x0][i].speed
	        		}
					return "<strong>"+flow[x0][i].roadname+"</strong>"+ "　" + "<strong>"+ x11 +"</strong>"
	        	});
            	
            	var hahaha = d3.selectAll(".des_body1 .des1")
            	var hahahatooltip = d3.selectAll(".des_body .des")
            	var hahaha1 = d3.selectAll("#MsgAccordion1 tbody tr")
            	for(var pp = 0; pp < hahaha.size(); ++pp){
            		if(pp == y01){
            			let scoTop = d3.select(hahaha._groups[0][pp])._groups[0][0].offsetTop;
            			let scoTop1 = d3.select(hahahatooltip._groups[0][pp])._groups[0][0].offsetTop;
            			d3.select(hahahatooltip._groups[0][pp]).style("background", "#D3D3D3")
            			d3.select(hahaha._groups[0][pp]).style("background", "#D3D3D3")
            			$(".des_body1").scrollTop(scoTop);
            			$(".des_body").scrollTop(scoTop1);
            			if(scoTop>$("#hdiv").height()){
							$("#hdiv").scrollTop(scoTop-$("#hdiv").height())
						}else{
							$("#hdiv").scrollTop($("#hdiv").scrollTop()-18)
						}
            		}else{
            			d3.select(hahaha._groups[0][pp]).style("background", "#FFFFFF")
            			d3.select(hahahatooltip._groups[0][pp]).style("background", "#FFFFFF")
            		}
            	}
            	for(var qq = 0; qq < hahaha1.size()-1; ++qq){
            		if(qq == y01){
            			let scoTop = d3.select(hahaha1._groups[0][qq])._groups[0][0].offsetTop;
            			d3.select(hahaha1._groups[0][qq]).style("background-color", "#D3D3D3")
            			$("#MsgAccordion1").scrollTop(scoTop);
            		}else{
            			d3.select(hahaha1._groups[0][qq]).style("background-color", "#FFF")
            		}
            	}
            	
            	var top_d, left_d, tooltipleft_d;
            	if(d3.event.pageY >= 663){
            		top_d = 76
            	}else{
            		top_d = d3.event.pageY-h1+5;
            	}
            	if(d3.event.pageX >= 1300){
            		left_d = d3.event.pageX-390-$(".tooltip1").width();
            		tooltipleft_d = d3.event.pageX-950-$(".tooltip").width()
            	}else{
            		left_d = d3.event.pageX-330;
            		tooltipleft_d = d3.event.pageX-880
            	}
            	let heightdesbody, heightdesbody1;
            	if(doma.length>9){
            		heightdesbody = 162;
            	}else{
            		heightdesbody = doma.length * 18;
            	}
            	tooltip1.style("left", left_d + "px")
            	       .style("top", (top_d-10) + "px")
            	       .style("height", (heightdesbody + 22) + "px");
            	d3.select(".tooltip").style("left",  tooltipleft_d+ "px")
            	       				 .style("top", (top_d-10) + "px")
            	       				 .style("height", (heightdesbody + 20) + "px");
            	des_body1.style("height", heightdesbody+"px")
            	d3.select(".des_body").style("height", heightdesbody+"px")
			};
			function hightlight(A){
				A = A.substring(1,A.length);
				A = 'road'+(parseInt(A)-1)
				if(A_last == A){
					d3.select('.'+A).attr("stroke-opacity", '1')
									.attr("stroke-width", '15')
				}else{
					d3.select('.'+A).attr("stroke-opacity", '1')
									.attr("stroke-width", '5')
					d3.select('.'+A_last).attr("stroke-opacity", '1')
									.attr("stroke-width", '5')
				}
				
				A_last = A;
			}
			function recthaha(){
				var colorDiv = d3.select("#body_svg").append("div")
						                 .attr("class", "colorDiv1")
						                 .style('background', "linear-gradient(to bottom, #076383, #e9f6fa)")
//						                 .style('background', "linear-gradient(to bottom, #002766, #003A8C, #0050B3, #096DD9, #1890FF, #40A9FF, #69C0FF, #91D5FF, #BAE7FF)")
				var colorp = d3.select("#body_svg").append("p")
										.attr("class", "colorp2")
				var colorp1 = d3.select("#body_svg").append("p")
										.attr("class", "colorp21")
				var colorp2 = d3.select("#body_svg").append("p")
										.attr("class", "colorp22")
				colorp.html("<b>"+ max_flow +"</b>")
				colorp1.html("<b>"+ min_flow +"</b>")
				colorp2.html("<b>Car/h</b>")
				}
		};
		
		function clearsvg11(){
			d3.select(".overlay").remove();
			d3.select(".tooltip").remove();
			d3.selectAll(".rect1").remove();
			d3.selectAll(".line1").remove();
			d3.selectAll(".line2").remove();
			d3.selectAll(".text1").remove();
			d3.select(".goback").remove();
			d3.select(".divshow").remove();
			d3.select(".colorDiv").remove();
			d3.select(".colorp1").remove();
			d3.select(".colorp11").remove();
			d3.select(".colorp12").remove();
		}
		function clearsvg21(){
			d3.select(".overlay1").remove();
			d3.select(".tooltip1").remove();
			d3.selectAll(".rect2").remove();
			d3.selectAll(".line2").remove();
			d3.selectAll(".line3").remove();
			d3.selectAll(".text2").remove();
			d3.select(".goback2").remove();
			d3.select(".divshow2").remove();
			d3.select(".colorDiv1").remove();
			d3.select(".colorp2").remove();
			d3.select(".colorp21").remove();
			d3.select(".colorp22").remove();
		}
//*******************************************画方块**************************************************//
//*******************************************热力图**************************************************//
		var realdata, preddata, whichclick, cnew1 = '#076383', cnew2 = '#e9f6fa';
	  	var predictcompute = d3.interpolate(cnew2,cnew1);;
		$("#prediction").on("click", function(){
				if(mode_flag == 2){
					clear4();
					var weekArray = [6, 0, 1, 2, 3, 4, 5]
					let s1 = $(".D1").val(), s2 = $(".ui-slider-tip").html(), s3;
					var week = weekArray[new Date(s1).getDay()]
					if(weeknumber==9){
						for(var j = 0; j<7; j++){
							let weekpiu = d3.selectAll(".week_text i")._groups[0][j]
							if(j == week){
								d3.select(weekpiu).style("color", "yellow")
							}else{
								d3.select(weekpiu).style("color", "#D3D3D3")
							}
						}
						week = week
					}else{
						week = weeknumber
					}
					$("#nowtime").val(s2).addClass("otheractive")
					s1 = parseInt(s1.substring(8, s1.length)), s2 = parseInt(s2.substring(0, 2))*60+parseInt(s2.substring(3, 5)), s3 = s2/30;
					console.log(s1, s3, weathernumber, week)
					var data = [s1, s3, weathernumber, week]
					var jsondata = JSON.stringify(data)
					weeknumber = 9
					$.ajax({
						type: 'post',
						data: jsondata,
						url: "http://127.0.0.1:8000/admin/new_1/",
						success: function(result){
						 		console.log(result.data)
						 		realdata = result.data[1], preddata = result.data[0]
						 		drawscatterchart(preddata[1], realdata[1])
						 		whichclick = 1
						 		var linear = d3.scaleLinear()  
									           .domain([d3.min(realdata[1]), d3.max(realdata[1])])  
									           .range([0,1]);
								let jj = 3;
								for(let j = 0; j<RS_list.length; j++){
									let color = predictcompute(linear(realdata[1][j]))
									if(j != 464){
								  		if(RS_list[j].length == 4){
								  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][3].lat),parseFloat(RS_list[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
								  					    .addTo(map);
								  		}else if(RS_list[j].length == 3){
								  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
								  						.addTo(map);
								  		}else{
								  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
								  						.addTo(map);
								  				}
									}
								}
					  	},
					  	dataType: 'JSON',
					});
				}
		})
		
		$("#left").on("click", function(){
			if(whichclick == 1){
				changeshow("left")
				drawscatterchart(preddata[0], realdata[0])
				var linear = d3.scaleLinear()  
					           .domain([d3.min(realdata[0]), d3.max(realdata[0])])  
					           .range([0,1]);
				for(var j=0; j<678; j++){
					d3.select(".road"+j).attr("stroke", predictcompute(linear(realdata[0][j])))
				}
				whichclick = 0
			}else if(whichclick == 2){
				changeshow("left")
				drawscatterchart(preddata[1], realdata[1])
				var linear = d3.scaleLinear()  
					           .domain([d3.min(realdata[1]), d3.max(realdata[1])])  
					           .range([0,1]);
				for(var j=0; j<678; j++){
					d3.select(".road"+j).attr("stroke", predictcompute(linear(realdata[1][j])))
				}
				whichclick = 1
			}
 		})
 		$("#right").on("click", function(){
 			if(whichclick == 1){
				changeshow("right")
				drawscatterchart(preddata[2], realdata[2])
				var linear = d3.scaleLinear()  
					           .domain([d3.min(realdata[2]), d3.max(realdata[2])])  
					           .range([0,1]);
				for(var j=0; j<678; j++){
					d3.select(".road"+j).attr("stroke", predictcompute(linear(realdata[2][j])))
				}
				whichclick = 2
			}else if(whichclick == 0){
				changeshow("right")
				drawscatterchart(preddata[1], realdata[1])
				var linear = d3.scaleLinear()  
					           .domain([d3.min(realdata[1]), d3.max(realdata[1])])  
					           .range([0,1]);
				for(var j=0; j<678; j++){
					d3.select(".road"+j).attr("stroke", predictcompute(linear(realdata[1][j])))
				}
				whichclick = 1
			}
 		})
		
		function changeshow(type){
			var newwwh, newwwm, newval;
 			var wwh = parseInt($("#nowtime").val().substring(0, 2)), wwm = parseInt($("#nowtime").val().substring(3, 5));
 			if(type == "left"){
 				newval = wwh*60+wwm-10
 			}else if(type == "right"){
 				newval = wwh*60+wwm+10
 			}
 			if(Math.floor(newval/60)>=10){
 				newwwh = Math.floor(newval/60)
 			}else{
 				newwwh = "0"+Math.floor(newval/60)
 			}
 			newwwm = newval - Math.floor((newval/60))*60
 			if(newwwm == 0){
 				newwwm = "00"
 			}else{
 				newwwm = newwwm
 			}
 			newval = newwwh +":"+ newwwm
 			$("#nowtime").val(newval)
		}
		
		function draw_road_fist1(A, B){
			d3.selectAll(".roadp").remove();
			var compute = d3.interpolate(c2,c1); 
			var linear = d3.scaleLinear()  
				           .domain([0,d3.max(A)])  
				           .range([0,1]);
  			var res_carflow = A
			var dt = B;
			for(var j = 0; j<dt.length; j++){
			  		if(dt[j].length == 4){
			  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)], [parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)], [parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)]], {color: compute(linear(res_carflow[j])), opacity: 1, weight: 6, className: 'roadp'})
			  					    .addTo(map);
			  		}else if(dt[j].length == 3){
			  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)], [parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]], {color: compute(linear(res_carflow[j])), opacity: 1, weight: 6, className: 'roadp'})
			  						.addTo(map);
			  		}else{
			  			polyline = L.polyline([[parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)], [parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]], {color: compute(linear(res_carflow[j])), opacity: 1, weight: 6, className: 'roadp'})
			  						.addTo(map);
			  				}
			  			}
  		}
		
		function clear4(){
//			$("#plan1").slideUp(300);
//			$("#plan2").slideUp(300);
			d3.selectAll(".markerpoi1").remove();
	    	d3.selectAll(".markerpoi2").remove();
	    	onMapclickCount = 0;
	    	d3.selectAll(".haha").remove();
	    	d3.selectAll(".road").remove();
		    d3.selectAll(".road1").remove();
		    d3.selectAll(".road2").remove();
		    $('.ts').prop("checked",true)
		    $('.ds').prop("checked",true)
			d3.selectAll(".roadp").remove();
			for(let i = 0; i<678; i++ ){
				d3.select(".road"+i).remove();
			}
		}
//*******************************************************饼状图显示预测与真实值之间的差距*******************************************************************************************************************************************************************************************************************************//
		var dataLine = [0.2, 0.4, 0.2, 0.08, 0.12]
		var colorSet = ["#032914", "#107535", "#2FC25B", "#7BDB91", "#D7F5DC"]
		var colordashbored = d3.scaleOrdinal(d3.schemeCategory10);
		
		var wi1 = 420, he1 = 300, padding1 = {top:40, bottom:20, left:50, right:20} 
		var xax = wi1-padding1.left-padding1.right;
	    var yax = he1-padding1.top-padding1.bottom;
	    var xSca = d3.scaleBand()
	                 .domain(["Zero", "One", "Two", "Three", "other"])//定义域何值域必须带上[]******
	                 .range([0,xax]);
	    var ySca = d3.scaleLinear()
	                 .domain([0, 0.5])
	                 .range([yax,0]);
		
		function drawLinechartAxis(){

		}
		
		function linechartUpdata(data){
		}
		
			
		function drawPiechart(data){

		}
		var scatterdata1 = [12.0, 6.0, 12.0, 13.0, 11.0, 24.0, 32.0, 33.0, 32.0, 23.0, 27.0, 33.0, 32.0, 20.0, 26.0, 28.0, 21.0, 12.0, 3.0, 0.0, 2.0, 2.0, 3.0, 2.0, 3.0, 9.0, 3.0, 1.0, 2.0, 2.0, 0.0, 0.0, 4.0, 13.0, 11.0, 14.0, 15.0, 3.0, 14.0, 2.0, 11.0, 6.0, 12.0, 8.0, 6.0, 5.0, 3.0, 2.0, 4.0, 4.0, 17.0, 8.0, 28.0, 8.0, 4.0, 14.0, 4.0, 27.0, 8.0, 13.0, 10.0, 9.0, 17.0, 16.0, 21.0, 23.0, 41.0, 29.0, 15.0, 22.0, 30.0, 13.0, 14.0, 34.0, 7.0, 31.0, 11.0, 21.0, 12.0, 15.0, 13.0, 0.0, 34.0, 33.0, 29.0, 1.0, 13.0, 5.0, 8.0, 41.0, 9.0, 37.0, 9.0, 6.0, 31.0, 22.0, 10.0, 26.0, 26.0, 15.0, 11.0, 7.0, 3.0, 8.0, 10.0, 8.0, 5.0, 9.0, 19.0, 19.0, 10.0, 18.0, 23.0, 6.0, 21.0, 9.0, 6.0, 5.0, 0.0, 1.0, 3.0, 9.0, 30.0, 1.0, 13.0, 20.0, 1.0, 19.0, 5.0, 27.0, 25.0, 14.0, 9.0, 9.0, 6.0, 3.0, 8.0, 21.0, 24.0, 15.0, 29.0, 6.0, 35.0, 21.0, 35.0, 11.0, 16.0, 7.0, 6.0, 5.0, 5.0, 6.0, 4.0, 8.0, 8.0, 7.0, 8.0, 11.0, 19.0, 19.0, 18.0, 25.0, 4.0, 5.0, 2.0, 9.0, 46.0, 11.0, 9.0, 47.0, 33.0, 4.0, 19.0, 19.0, 5.0, 43.0, 7.0, 36.0, 24.0, 4.0, 23.0, 28.0, 12.0, 13.0, 16.0, 9.0, 9.0, 15.0, 11.0, 3.0, 5.0, 4.0, 18.0, 3.0, 2.0, 15.0, 8.0, 21.0, 6.0, 0.0, 20.0, 14.0, 18.0, 24.0, 22.0, 22.0, 23.0, 26.0, 2.0, 9.0, 5.0, 4.0, 21.0, 26.0, 30.0, 25.0, 21.0, 4.0, 4.0, 18.0, 9.0, 20.0, 26.0, 25.0, 22.0, 7.0, 8.0, 42.0, 39.0, 28.0, 31.0, 26.0, 1.0, 19.0, 28.0, 29.0, 39.0, 40.0, 8.0, 1.0, 43.0, 16.0, 1.0, 5.0, 1.0, 7.0, 19.0, 5.0, 3.0, 6.0, 3.0, 24.0, 19.0, 4.0, 13.0, 4.0, 6.0, 6.0, 1.0, 7.0, 5.0, 5.0, 8.0, 8.0, 8.0, 36.0, 15.0, 19.0, 11.0, 14.0, 7.0, 4.0, 11.0, 2.0, 7.0, 12.0, 2.0, 0.0, 9.0, 10.0, 7.0, 8.0, 15.0, 16.0, 18.0, 8.0, 10.0, 13.0, 14.0, 4.0, 4.0, 15.0, 29.0, 11.0, 41.0, 4.0, 1.0, 3.0, 2.0, 18.0, 2.0, 2.0, 2.0, 10.0, 9.0, 13.0, 18.0, 21.0, 12.0, 16.0, 19.0, 20.0, 23.0, 10.0, 23.0, 7.0, 14.0, 1.0, 30.0, 26.0, 42.0, 35.0, 24.0, 21.0, 26.0, 1.0, 3.0, 25.0, 5.0, 31.0, 1.0, 20.0, 13.0, 20.0, 26.0, 29.0, 18.0, 33.0, 37.0, 20.0, 17.0, 17.0, 11.0, 6.0, 13.0, 23.0, 40.0, 19.0, 10.0, 9.0, 24.0, 9.0, 1.0, 10.0, 22.0, 19.0, 2.0, 3.0, 0.0, 1.0, 2.0, 0.0, 41.0, 43.0, 21.0, 2.0, 0.0, 54.0, 37.0, 29.0, 27.0, 32.0, 11.0, 12.0, 15.0, 46.0, 32.0, 5.0, 3.0, 10.0, 5.0, 4.0, 2.0, 23.0, 31.0, 13.0, 15.0, 3.0, 12.0, 7.0, 1.0, 7.0, 5.0, 6.0, 2.0, 6.0, 9.0, 10.0, 2.0, 2.0, 1.0, 9.0, 1.0, 9.0, 2.0, 8.0, 6.0, 5.0, 5.0, 0.0, 0.0, 0.0, 2.0, 23.0, 8.0, 12.0, 39.0, 21.0, 7.0, 1.0, 20.0, 21.0, 6.0, 5.0, 5.0, 7.0, 2.0, 3.0, 2.0, 1.0, 3.0, 4.0, 8.0, 29.0, 25.0, 23.0, 14.0, 35.0, 32.0, 21.0, 27.0, 43.0, 23.0, 18.0, 30.0, 26.0, 28.0, 21.0, 9.0, 11.0, 8.0, 7.0, 33.0, 32.0, 26.0, 11.0, 18.0, 25.0, 42.0, 36.0, 3.0, 29.0, 38.0, 52.0, 0.0, 2.0, 5.0, 1.0, 1.0, 17.0, 10.0, 7.0, 9.0, 6.0, 8.0, 3.0, 3.0, 23.0, 10.0, 15.0, 2.0, 1.0, 3.0, 13.0, 2.0, 14.0, 29.0, 48.0, 37.0, 16.0, 35.0, 17.0, 3.0, 8.0, 12.0, 6.0, 6.0, 6.0, 12.0, 6.0, 17.0, 1.0, 0.0, 15.0, 2.0, 17.0, 1.0, 0.0, 14.0, 0.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0, 0.0, 0.0, 1.0, 6.0, 4.0, 2.0, 14.0, 1.0, 10.0, 1.0, 0.0, 1.0, 10.0, 4.0, 5.0, 18.0, 4.0, 21.0, 7.0, 17.0, 39.0, 10.0, 4.0, 1.0, 2.0, 0.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 0.0, 2.0, 6.0, 1.0, 5.0, 1.0, 2.0, 0.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 17.0, 9.0, 16.0, 0.0, 14.0, 3.0, 1.0, 5.0, 19.0, 8.0, 13.0, 13.0, 3.0, 4.0, 5.0, 15.0, 1.0, 14.0, 5.0, 11.0, 9.0, 19.0, 27.0, 14.0, 17.0, 9.0, 9.0, 10.0, 10.0, 15.0, 20.0, 25.0, 18.0, 14.0, 6.0, 5.0, 1.0, 1.0, 15.0, 4.0, 16.0, 13.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 2.0, 0.0, 3.0, 4.0, 13.0, 4.0, 1.0, 1.0, 11.0, 10.0, 7.0, 3.0, 2.0, 2.0, 0.0, 9.0, 3.0, 10.0, 9.0, 2.0, 3.0, 18.0, 3.0, 3.0, 16.0, 3.0, 5.0, 4.0, 11.0, 6.0, 0.0, 9.0, 9.0, 16.0, 10.0];
		var scatterdata2 = [11.0, 14.0, 9.0, 9.0, 5.0, 17.0, 18.0, 31.0, 25.0, 22.0, 25.0, 17.0, 25.0, 23.0, 28.0, 24.0, 16.0, 11.0, 2.0, 1.0, 2.0, 3.0, 3.0, 2.0, 4.0, 16.0, 2.0, 0.0, 2.0, 3.0, 0.0, 0.0, 4.0, 8.0, 6.0, 8.0, 10.0, 1.0, 13.0, 0.0, 8.0, 8.0, 8.0, 9.0, 2.0, 5.0, 0.0, 2.0, 3.0, 1.0, 30.0, 12.0, 34.0, 20.0, 4.0, 17.0, 4.0, 27.0, 5.0, 13.0, 9.0, 11.0, 11.0, 10.0, 12.0, 10.0, 27.0, 21.0, 12.0, 14.0, 26.0, 8.0, 17.0, 18.0, 6.0, 26.0, 14.0, 17.0, 8.0, 15.0, 16.0, 0.0, 20.0, 20.0, 15.0, 1.0, 11.0, 2.0, 11.0, 27.0, 9.0, 18.0, 12.0, 5.0, 34.0, 26.0, 9.0, 30.0, 30.0, 11.0, 13.0, 8.0, 4.0, 10.0, 12.0, 9.0, 5.0, 15.0, 15.0, 24.0, 11.0, 20.0, 20.0, 4.0, 30.0, 10.0, 7.0, 8.0, 0.0, 1.0, 3.0, 6.0, 34.0, 2.0, 16.0, 17.0, 3.0, 17.0, 3.0, 23.0, 25.0, 9.0, 5.0, 3.0, 4.0, 0.0, 3.0, 16.0, 15.0, 8.0, 15.0, 0.0, 14.0, 14.0, 10.0, 4.0, 11.0, 5.0, 4.0, 2.0, 7.0, 7.0, 3.0, 1.0, 3.0, 7.0, 3.0, 6.0, 26.0, 16.0, 9.0, 19.0, 1.0, 3.0, 2.0, 9.0, 36.0, 10.0, 11.0, 36.0, 24.0, 1.0, 14.0, 19.0, 4.0, 34.0, 7.0, 30.0, 24.0, 4.0, 24.0, 35.0, 14.0, 10.0, 15.0, 8.0, 11.0, 9.0, 4.0, 3.0, 3.0, 2.0, 10.0, 2.0, 2.0, 17.0, 7.0, 20.0, 6.0, 0.0, 9.0, 11.0, 19.0, 15.0, 13.0, 22.0, 23.0, 13.0, 3.0, 7.0, 5.0, 5.0, 18.0, 29.0, 23.0, 10.0, 15.0, 5.0, 0.0, 7.0, 7.0, 13.0, 18.0, 15.0, 13.0, 4.0, 7.0, 30.0, 30.0, 25.0, 18.0, 27.0, 0.0, 18.0, 14.0, 25.0, 37.0, 34.0, 5.0, 1.0, 28.0, 15.0, 1.0, 3.0, 0.0, 7.0, 11.0, 4.0, 2.0, 5.0, 6.0, 13.0, 19.0, 8.0, 11.0, 3.0, 9.0, 6.0, 1.0, 7.0, 2.0, 6.0, 8.0, 7.0, 6.0, 38.0, 18.0, 18.0, 12.0, 13.0, 7.0, 4.0, 8.0, 3.0, 5.0, 11.0, 2.0, 0.0, 4.0, 10.0, 5.0, 4.0, 14.0, 12.0, 15.0, 8.0, 6.0, 11.0, 10.0, 4.0, 0.0, 15.0, 10.0, 8.0, 20.0, 6.0, 0.0, 3.0, 2.0, 54.0, 1.0, 1.0, 3.0, 10.0, 12.0, 21.0, 21.0, 20.0, 17.0, 23.0, 26.0, 20.0, 22.0, 20.0, 24.0, 6.0, 8.0, 3.0, 32.0, 34.0, 31.0, 24.0, 10.0, 13.0, 23.0, 1.0, 1.0, 17.0, 2.0, 30.0, 2.0, 18.0, 12.0, 10.0, 23.0, 32.0, 19.0, 29.0, 28.0, 23.0, 19.0, 16.0, 17.0, 2.0, 16.0, 17.0, 38.0, 11.0, 10.0, 8.0, 32.0, 9.0, 1.0, 12.0, 25.0, 25.0, 0.0, 4.0, 0.0, 2.0, 5.0, 3.0, 39.0, 37.0, 21.0, 5.0, 1.0, 73.0, 35.0, 24.0, 33.0, 39.0, 12.0, 11.0, 10.0, 57.0, 29.0, 4.0, 1.0, 1.0, 4.0, 2.0, 1.0, 31.0, 32.0, 7.0, 21.0, 2.0, 13.0, 4.0, 1.0, 4.0, 3.0, 4.0, 1.0, 4.0, 12.0, 13.0, 1.0, 2.0, 1.0, 14.0, 2.0, 10.0, 1.0, 6.0, 6.0, 6.0, 3.0, 0.0, 1.0, 0.0, 3.0, 14.0, 5.0, 14.0, 40.0, 26.0, 4.0, 2.0, 30.0, 30.0, 11.0, 7.0, 6.0, 11.0, 1.0, 1.0, 2.0, 0.0, 2.0, 3.0, 6.0, 22.0, 30.0, 17.0, 16.0, 17.0, 15.0, 13.0, 16.0, 32.0, 12.0, 12.0, 34.0, 22.0, 33.0, 28.0, 13.0, 10.0, 6.0, 1.0, 15.0, 11.0, 15.0, 9.0, 7.0, 21.0, 40.0, 21.0, 2.0, 13.0, 25.0, 45.0, 0.0, 1.0, 5.0, 1.0, 0.0, 17.0, 14.0, 9.0, 10.0, 7.0, 14.0, 5.0, 6.0, 40.0, 16.0, 27.0, 1.0, 0.0, 4.0, 15.0, 5.0, 16.0, 40.0, 68.0, 47.0, 16.0, 28.0, 12.0, 2.0, 7.0, 9.0, 4.0, 5.0, 6.0, 11.0, 7.0, 10.0, 0.0, 0.0, 9.0, 0.0, 11.0, 2.0, 0.0, 15.0, 0.0, 0.0, 1.0, 1.0, 1.0, 3.0, 0.0, 1.0, 1.0, 0.0, 3.0, 4.0, 3.0, 14.0, 0.0, 12.0, 2.0, 0.0, 0.0, 9.0, 4.0, 6.0, 17.0, 5.0, 21.0, 7.0, 18.0, 84.0, 13.0, 8.0, 4.0, 6.0, 1.0, 2.0, 3.0, 3.0, 1.0, 1.0, 2.0, 0.0, 4.0, 5.0, 1.0, 7.0, 1.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 9.0, 8.0, 24.0, 0.0, 12.0, 3.0, 2.0, 4.0, 19.0, 10.0, 9.0, 12.0, 2.0, 2.0, 2.0, 14.0, 2.0, 17.0, 4.0, 7.0, 4.0, 16.0, 30.0, 14.0, 17.0, 8.0, 4.0, 12.0, 4.0, 10.0, 11.0, 15.0, 12.0, 15.0, 7.0, 5.0, 1.0, 1.0, 14.0, 4.0, 17.0, 14.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 2.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 2.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 3.0, 9.0, 13.0, 4.0, 1.0, 2.0, 8.0, 11.0, 8.0, 4.0, 2.0, 0.0, 0.0, 8.0, 8.0, 11.0, 11.0, 1.0, 5.0, 22.0, 3.0, 2.0, 22.0, 2.0, 4.0, 2.0, 10.0, 2.0, 0.0, 9.0, 7.0, 14.0, 11.0]
		var scatterdata3 = [24, 28, 44, 26, 22, 27, 21, 23, 21, 9, 23, 23, 34, 32, 39, 29, 39, 27, 44, 0, 40, 27, 34, 63, 27, 73, 10, 0, 16, 0, 0, 0, 17, 19, 28, 24, 20, 28, 26, 0, 17, 29, 36, 25, 48, 0, 57, 55, 29, 47, 14, 20, 11, 0, 19, 28, 49, 11, 37, 19, 11, 18, 21, 25, 33, 31, 12, 17, 18, 17, 21, 5, 3, 12, 0, 4, 0, 2, 3, 13, 7, 0, 0, 14, 2, 0, 0, 8, 0, 1, 0, 3, 2, 3, 5, 4, 3, 5, 10, 16, 5, 2, 0, 5, 21, 24, 18, 35, 41, 30, 26, 30, 27, 35, 7, 28, 6, 0, 0, 29, 0, 32, 26, 0, 12, 12, 7, 6, 4, 18, 18, 2, 18, 0, 0, 10, 11, 5, 5, 0, 3, 0, 0, 8, 6, 6, 22, 22, 48, 30, 52, 0, 20, 33, 42, 37, 41, 19, 21, 25, 10, 26, 0, 9, 0, 21, 13, 34, 16, 14, 37, 12, 41, 30, 17, 24, 0, 21, 9, 5, 28, 23, 0, 30, 12, 10, 14, 20, 19, 0, 13, 29, 21, 0, 0, 19, 32, 22, 12, 0, 9, 6, 5, 20, 16, 11, 9, 4, 0, 25, 40, 0, 23, 26, 27, 20, 9, 5, 21, 30, 0, 18, 11, 7, 12, 13, 18, 10, 6, 7, 14, 18, 0, 13, 14, 25, 29, 30, 3, 0, 21, 13, 7, 0, 17, 27, 16, 20, 1, 10, 9, 39, 32, 11, 22, 0, 0, 0, 26, 33, 0, 36, 27, 21, 33, 28, 22, 27, 34, 9, 0, 3, 11, 14, 0, 23, 0, 0, 8, 47, 14, 14, 10, 39, 24, 23, 32, 24, 22, 0, 14, 10, 4, 8, 8, 0, 0, 0, 0, 9, 0, 45, 21, 26, 24, 41, 27, 17, 10, 38, 40, 27, 19, 17, 15, 22, 43, 0, 32, 14, 25, 34, 31, 37, 25, 0, 0, 17, 0, 17, 8, 16, 18, 16, 22, 21, 18, 22, 19, 15, 38, 24, 32, 14, 14, 40, 25, 22, 34, 28, 61, 25, 0, 33, 54, 55, 0, 0, 11, 2, 44, 13, 13, 20, 25, 3, 0, 7, 22, 12, 20, 21, 12, 13, 22, 18, 30, 18, 0, 19, 24, 20, 0, 36, 27, 44, 28, 0, 38, 12, 25, 11, 28, 30, 0, 42, 0, 14, 0, 34, 15, 27, 0, 32, 0, 23, 31, 25, 10, 20, 0, 0, 0, 16, 12, 20, 20, 49, 35, 0, 28, 70, 18, 10, 21, 18, 0, 16, 0, 0, 7, 16, 8, 25, 56, 25, 35, 18, 18, 21, 17, 25, 21, 29, 22, 15, 17, 24, 26, 32, 40, 35, 22, 17, 15, 1, 15, 8, 13, 19, 0, 29, 8, 20, 0, 12, 32, 0, 0, 24, 50, 55, 29, 26, 22, 36, 0, 59, 22, 43, 13, 33, 22, 27, 0, 28, 22, 18, 27, 34, 31, 32, 30, 19, 50, 30, 34, 24, 53, 31, 63, 0, 0, 78, 0, 67, 0, 44, 84, 38, 0, 13, 27, 0, 28, 0, 0, 0, 0, 4, 20, 0, 26, 0, 35, 0, 0, 0, 44, 33, 26, 35, 35, 44, 20, 36, 19, 43, 65, 34, 37, 0, 0, 0, 18, 0, 13, 0, 0, 32, 42, 0, 36, 0, 12, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 7, 35, 10, 75, 45, 21, 11, 0, 4, 19, 11, 56, 30, 0, 27, 0, 26, 26, 17, 23, 21, 16, 36, 17, 42, 16, 17, 27, 23, 39, 34, 38, 34, 38, 61, 30, 29, 14, 0, 71, 23, 65, 51, 0, 25, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 42, 0, 0, 10, 19, 0, 0, 0, 0, 0, 50, 0, 40, 29, 20, 20, 0, 0, 24, 0, 28, 0, 0, 0, 0, 0, 0, 45, 43, 39, 48, 11, 30, 6, 56, 15, 25, 22, 7, 10, 0, 6, 13, 24, 0];
		var scatterdata31 = [24, 28, 44, 26, 22, 27, 21, 23, 21, 9, 23, 23, 34, 32, 39, 29, 39, 27, 44, 0, 40, 27, 34, 63, 27, 73, 10, 0, 16, 0, 0, 0, 17, 19, 28, 24, 20, 28, 26, 0, 17, 29, 36, 25, 48, 0, 57, 55, 29, 47, 14, 20, 11, 0, 19, 28, 49, 11, 37, 19, 11, 18, 21, 25, 33, 31, 12, 17, 18, 17, 21, 5, 3, 12, 0, 4, 0, 2, 3, 13, 7, 0, 0, 14, 2, 0, 0, 8, 0, 1, 0, 3, 2, 3, 5, 4, 3, 5, 10, 16, 5, 2, 0, 5, 21, 24, 18, 35, 41, 30, 26, 30, 27, 35, 7, 28, 6, 0, 0, 29, 0, 32, 26, 0, 12, 12, 7, 6, 4, 18, 18, 2, 18, 0, 0, 10, 11, 5, 5, 0, 3, 0, 0, 8, 6, 6, 22, 22, 48, 30, 52, 0, 20, 33, 42, 37, 41, 19, 21, 25, 10, 26, 0, 9, 0, 21, 13, 34, 16, 14, 37, 12, 41, 30, 17, 24, 0, 21, 9, 5, 28, 23, 0, 30, 12, 10, 14, 20, 19, 0, 13, 29, 21, 0, 0, 19, 32, 22, 12, 0, 9, 6, 5, 20, 16, 11, 9, 4, 0, 25, 40, 0, 23, 26, 27, 20, 9, 5, 21, 30, 0, 18, 11, 7, 12, 13, 18, 10, 6, 7, 14, 18, 0, 13, 14, 25, 29, 30, 3, 0, 21, 13, 7, 0, 17, 27, 16, 20, 1, 10, 9, 39, 32, 11, 22, 0, 0, 0, 26, 33, 0, 36, 27, 21, 33, 28, 22, 27, 34, 9, 0, 3, 11, 14, 0, 23, 0, 0, 8, 47, 14, 14, 10, 39, 24, 23, 32, 24, 22, 0, 14, 10, 4, 8, 8, 0, 0, 0, 0, 9, 0, 45, 21, 26, 24, 41, 27, 17, 10, 38, 40, 27, 19, 17, 15, 22, 43, 0, 32, 14, 25, 34, 31, 37, 25, 0, 0, 17, 0, 17, 8, 16, 18, 16, 22, 21, 18, 22, 19, 15, 38, 24, 32, 14, 14, 40, 25, 22, 34, 28, 61, 25, 0, 33, 54, 55, 0, 0, 11, 2, 44, 13, 13, 20, 25, 3, 0, 7, 22, 12, 20, 21, 12, 13, 22, 18, 30, 18, 0, 19, 24, 20, 0, 36, 27, 44, 28, 0, 38, 12, 25, 11, 28, 30, 0, 42, 0, 14, 0, 34, 15, 27, 0, 32, 0, 23, 31, 25, 10, 20, 0, 0, 0, 16, 12, 20, 20, 49, 35, 0, 28, 70, 18, 10, 21, 18, 0, 16, 0, 0, 7, 16, 8, 25, 56, 25, 35, 18, 18, 21, 17, 25, 21, 43, 38, 33, 36, 38, 38, 48, 60, 50, 44, 28, 15, 1, 15, 8, 13, 19, 0, 29, 8, 20, 0, 12, 32, 0, 0, 24, 50, 55, 29, 26, 22, 36, 0, 59, 22, 43, 13, 33, 22, 27, 0, 28, 22, 18, 27, 34, 31, 32, 30, 19, 50, 30, 34, 24, 53, 31, 63, 0, 0, 78, 0, 67, 0, 44, 84, 38, 0, 13, 27, 0, 28, 0, 0, 0, 0, 4, 20, 0, 26, 0, 35, 0, 0, 0, 44, 33, 26, 35, 35, 44, 20, 36, 19, 43, 65, 34, 37, 0, 0, 0, 18, 0, 13, 0, 0, 32, 42, 0, 36, 0, 12, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 7, 35, 10, 75, 45, 21, 11, 0, 4, 19, 11, 56, 30, 0, 27, 0, 26, 26, 17, 23, 21, 16, 36, 17, 42, 16, 17, 27, 23, 39, 34, 38, 34, 38, 61, 30, 29, 14, 0, 71, 23, 65, 51, 0, 25, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 42, 0, 0, 10, 19, 0, 0, 0, 0, 0, 50, 0, 40, 29, 20, 20, 0, 0, 24, 0, 28, 0, 0, 0, 0, 0, 0, 45, 43, 39, 48, 11, 30, 6, 56, 15, 25, 22, 7, 10, 0, 6, 13, 24, 0];
		var scatterdata4 = [24, 28, 44, 26, 22, 27, 21, 23, 21, 9, 23, 23, 34, 32, 39, 29, 39, 27, 44, 0, 40, 27, 34, 63, 27, 73, 10, 0, 16, 0, 0, 0, 17, 19, 28, 24, 20, 28, 26, 0, 17, 29, 36, 25, 48, 0, 57, 55, 29, 47, 14, 20, 11, 0, 19, 28, 49, 11, 37, 19, 11, 18, 21, 25, 33, 31, 12, 17, 18, 17, 21, 5, 3, 12, 0, 4, 0, 2, 3, 13, 7, 0, 0, 14, 2, 0, 0, 8, 0, 1, 0, 3, 2, 3, 5, 4, 3, 5, 10, 16, 5, 2, 0, 5, 21, 24, 18, 35, 41, 30, 26, 30, 27, 35, 7, 28, 6, 0, 0, 29, 0, 32, 26, 0, 12, 12, 7, 6, 4, 18, 18, 2, 18, 0, 0, 10, 11, 5, 5, 0, 3, 0, 0, 8, 6, 6, 22, 22, 48, 30, 52, 0, 20, 33, 42, 37, 41, 19, 21, 25, 10, 26, 0, 9, 0, 21, 13, 34, 16, 14, 37, 12, 41, 30, 17, 24, 0, 21, 9, 5, 28, 23, 0, 30, 12, 10, 14, 20, 19, 0, 13, 29, 21, 0, 0, 19, 32, 22, 12, 0, 9, 6, 5, 20, 16, 11, 9, 4, 0, 25, 40, 0, 23, 26, 27, 20, 9, 5, 21, 30, 0, 18, 11, 7, 12, 13, 18, 10, 6, 7, 14, 18, 0, 13, 14, 25, 29, 30, 3, 0, 21, 13, 7, 0, 17, 27, 16, 20, 1, 10, 9, 39, 32, 11, 22, 0, 0, 0, 26, 33, 0, 36, 27, 21, 33, 28, 22, 27, 34, 9, 0, 3, 11, 14, 0, 23, 0, 0, 8, 47, 14, 14, 10, 39, 24, 23, 32, 24, 22, 0, 14, 10, 4, 8, 8, 0, 0, 0, 0, 9, 0, 45, 21, 26, 24, 41, 27, 17, 10, 38, 40, 27, 19, 17, 15, 22, 43, 0, 32, 14, 25, 34, 31, 37, 25, 0, 0, 17, 0, 17, 8, 16, 18, 16, 22, 21, 18, 22, 19, 15, 38, 24, 32, 14, 14, 40, 25, 22, 34, 28, 61, 25, 0, 33, 54, 55, 0, 0, 11, 2, 44, 13, 13, 20, 25, 3, 0, 7, 22, 12, 20, 21, 12, 13, 22, 18, 30, 18, 0, 19, 24, 20, 0, 36, 27, 44, 28, 0, 38, 12, 25, 11, 28, 30, 0, 42, 0, 14, 0, 34, 15, 27, 0, 32, 0, 23, 31, 25, 10, 20, 0, 0, 0, 16, 12, 20, 20, 49, 35, 0, 28, 70, 18, 10, 21, 18, 0, 16, 0, 0, 7, 16, 8, 25, 56, 25, 35, 18, 18, 21, 17, 25, 21, 25, 20, 16, 12, 25, 26, 28, 34, 30, 21, 19, 15, 1, 15, 8, 13, 19, 0, 29, 8, 20, 0, 12, 32, 0, 0, 24, 50, 55, 29, 26, 22, 36, 0, 59, 22, 43, 13, 33, 22, 27, 0, 28, 22, 18, 27, 34, 31, 32, 30, 19, 50, 30, 34, 24, 53, 31, 63, 0, 0, 78, 0, 67, 0, 44, 84, 38, 0, 13, 27, 0, 28, 0, 0, 0, 0, 4, 20, 0, 26, 0, 35, 0, 0, 0, 44, 33, 26, 35, 35, 44, 20, 36, 19, 43, 65, 34, 37, 0, 0, 0, 18, 0, 13, 0, 0, 32, 42, 0, 36, 0, 12, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 7, 35, 10, 75, 45, 21, 11, 0, 4, 19, 11, 56, 30, 0, 27, 0, 26, 26, 17, 23, 21, 16, 36, 17, 42, 16, 17, 27, 23, 39, 34, 38, 34, 38, 61, 30, 29, 14, 0, 71, 23, 65, 51, 0, 25, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 42, 0, 0, 10, 19, 0, 0, 0, 0, 0, 50, 0, 40, 29, 20, 20, 0, 0, 24, 0, 28, 0, 0, 0, 0, 0, 0, 45, 43, 39, 48, 11, 30, 6, 56, 15, 25, 22, 7, 10, 0, 6, 13, 24, 0];
		var scatterdata41 = [24, 28, 44, 26, 22, 27, 21, 23, 21, 9, 23, 23, 34, 32, 39, 29, 39, 27, 44, 0, 40, 27, 34, 63, 27, 73, 10, 0, 16, 0, 0, 0, 17, 19, 28, 24, 20, 28, 26, 0, 17, 29, 36, 25, 48, 0, 57, 55, 29, 47, 14, 20, 11, 0, 19, 28, 49, 11, 37, 19, 11, 18, 21, 25, 33, 31, 12, 17, 18, 17, 21, 5, 3, 12, 0, 4, 0, 2, 3, 13, 7, 0, 0, 14, 2, 0, 0, 8, 0, 1, 0, 3, 2, 3, 5, 4, 3, 5, 10, 16, 5, 2, 0, 5, 21, 24, 18, 35, 41, 30, 26, 30, 27, 35, 7, 28, 6, 0, 0, 29, 0, 32, 26, 0, 12, 12, 7, 6, 4, 18, 18, 2, 18, 0, 0, 10, 11, 5, 5, 0, 3, 0, 0, 8, 6, 6, 22, 22, 48, 30, 52, 0, 20, 33, 42, 37, 41, 19, 21, 25, 10, 26, 0, 9, 0, 21, 13, 34, 16, 14, 37, 12, 41, 30, 17, 24, 0, 21, 9, 5, 28, 23, 0, 30, 12, 10, 14, 20, 19, 0, 13, 29, 21, 0, 0, 19, 32, 22, 12, 0, 9, 6, 5, 20, 16, 11, 9, 4, 0, 25, 40, 0, 23, 26, 27, 20, 9, 5, 21, 30, 0, 18, 11, 7, 12, 13, 18, 10, 6, 7, 14, 18, 0, 13, 14, 25, 29, 30, 3, 0, 21, 13, 7, 0, 17, 27, 16, 20, 1, 10, 9, 39, 32, 11, 22, 0, 0, 0, 26, 33, 0, 36, 27, 21, 33, 28, 22, 27, 34, 9, 0, 3, 11, 14, 0, 23, 0, 0, 8, 47, 14, 14, 10, 39, 24, 23, 32, 24, 22, 0, 14, 10, 4, 8, 8, 0, 0, 0, 0, 9, 0, 45, 21, 26, 24, 41, 27, 17, 10, 38, 40, 27, 19, 17, 15, 22, 43, 0, 32, 14, 25, 34, 31, 37, 25, 0, 0, 17, 0, 17, 8, 16, 18, 16, 22, 21, 18, 22, 19, 15, 38, 24, 32, 14, 14, 40, 25, 22, 34, 28, 61, 25, 0, 33, 54, 55, 0, 0, 11, 2, 44, 13, 13, 20, 25, 3, 0, 7, 22, 12, 20, 21, 12, 13, 22, 18, 30, 18, 0, 19, 24, 20, 0, 36, 27, 44, 28, 0, 38, 12, 25, 11, 28, 30, 0, 42, 0, 14, 0, 34, 15, 27, 0, 32, 0, 23, 31, 25, 10, 20, 0, 0, 0, 16, 12, 20, 20, 49, 35, 0, 28, 70, 18, 10, 21, 18, 0, 16, 0, 0, 7, 16, 8, 25, 56, 25, 35, 18, 18, 21, 17, 25, 21, 31, 28, 22, 26, 25, 33, 40, 50, 40, 27, 25, 15, 1, 15, 8, 13, 19, 0, 29, 8, 20, 0, 12, 32, 0, 0, 24, 50, 55, 29, 26, 22, 36, 0, 59, 22, 43, 13, 33, 22, 27, 0, 28, 22, 18, 27, 34, 31, 32, 30, 19, 50, 30, 34, 24, 53, 31, 63, 0, 0, 78, 0, 67, 0, 44, 84, 38, 0, 13, 27, 0, 28, 0, 0, 0, 0, 4, 20, 0, 26, 0, 35, 0, 0, 0, 44, 33, 26, 35, 35, 44, 20, 36, 19, 43, 65, 34, 37, 0, 0, 0, 18, 0, 13, 0, 0, 32, 42, 0, 36, 0, 12, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 7, 35, 10, 75, 45, 21, 11, 0, 4, 19, 11, 56, 30, 0, 27, 0, 26, 26, 17, 23, 21, 16, 36, 17, 42, 16, 17, 27, 23, 39, 34, 38, 34, 38, 61, 30, 29, 14, 0, 71, 23, 65, 51, 0, 25, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 42, 0, 0, 10, 19, 0, 0, 0, 0, 0, 50, 0, 40, 29, 20, 20, 0, 0, 24, 0, 28, 0, 0, 0, 0, 0, 0, 45, 43, 39, 48, 11, 30, 6, 56, 15, 25, 22, 7, 10, 0, 6, 13, 24, 0];
		var scatterdata42 = [24, 28, 44, 26, 22, 27, 21, 23, 21, 9, 23, 23, 34, 32, 39, 29, 39, 27, 44, 0, 40, 27, 34, 63, 27, 73, 10, 0, 16, 0, 0, 0, 17, 19, 28, 24, 20, 28, 26, 0, 17, 29, 36, 25, 48, 0, 57, 55, 29, 47, 14, 20, 11, 0, 19, 28, 49, 11, 37, 19, 11, 18, 21, 25, 33, 31, 12, 17, 18, 17, 21, 5, 3, 12, 0, 4, 0, 2, 3, 13, 7, 0, 0, 14, 2, 0, 0, 8, 0, 1, 0, 3, 2, 3, 5, 4, 3, 5, 10, 16, 5, 2, 0, 5, 21, 24, 18, 35, 41, 30, 26, 30, 27, 35, 7, 28, 6, 0, 0, 29, 0, 32, 26, 0, 12, 12, 7, 6, 4, 18, 18, 2, 18, 0, 0, 10, 11, 5, 5, 0, 3, 0, 0, 8, 6, 6, 22, 22, 48, 30, 52, 0, 20, 33, 42, 37, 41, 19, 21, 25, 10, 26, 0, 9, 0, 21, 13, 34, 16, 14, 37, 12, 41, 30, 17, 24, 0, 21, 9, 5, 28, 23, 0, 30, 12, 10, 14, 20, 19, 0, 13, 29, 21, 0, 0, 19, 32, 22, 12, 0, 9, 6, 5, 20, 16, 11, 9, 4, 0, 25, 40, 0, 23, 26, 27, 20, 9, 5, 21, 30, 0, 18, 11, 7, 12, 13, 18, 10, 6, 7, 14, 18, 0, 13, 14, 25, 29, 30, 3, 0, 21, 13, 7, 0, 17, 27, 16, 20, 1, 10, 9, 39, 32, 11, 22, 0, 0, 0, 26, 33, 0, 36, 27, 21, 33, 28, 22, 27, 34, 9, 0, 3, 11, 14, 0, 23, 0, 0, 8, 47, 14, 14, 10, 39, 24, 23, 32, 24, 22, 0, 14, 10, 4, 8, 8, 0, 0, 0, 0, 9, 0, 45, 21, 26, 24, 41, 27, 17, 10, 38, 40, 27, 19, 17, 15, 22, 43, 0, 32, 14, 25, 34, 31, 37, 25, 0, 0, 17, 0, 17, 8, 16, 18, 16, 22, 21, 18, 22, 19, 15, 38, 24, 32, 14, 14, 40, 25, 22, 34, 28, 61, 25, 0, 33, 54, 55, 0, 0, 11, 2, 44, 13, 13, 20, 25, 3, 0, 7, 22, 12, 20, 21, 12, 13, 22, 18, 30, 18, 0, 19, 24, 20, 0, 36, 27, 44, 28, 0, 38, 12, 25, 11, 28, 30, 0, 42, 0, 14, 0, 34, 15, 27, 0, 32, 0, 23, 31, 25, 10, 20, 0, 0, 0, 16, 12, 20, 20, 49, 35, 0, 28, 70, 18, 10, 21, 18, 0, 16, 0, 0, 7, 16, 8, 25, 56, 25, 35, 18, 18, 21, 17, 25, 21, 42, 40, 38, 35, 38, 32, 53, 57, 48, 40, 28, 15, 1, 15, 8, 13, 19, 0, 29, 8, 20, 0, 12, 32, 0, 0, 24, 50, 55, 29, 26, 22, 36, 0, 59, 22, 43, 13, 33, 22, 27, 0, 28, 22, 18, 27, 34, 31, 32, 30, 19, 50, 30, 34, 24, 53, 31, 63, 0, 0, 78, 0, 67, 0, 44, 84, 38, 0, 13, 27, 0, 28, 0, 0, 0, 0, 4, 20, 0, 26, 0, 35, 0, 0, 0, 44, 33, 26, 35, 35, 44, 20, 36, 19, 43, 65, 34, 37, 0, 0, 0, 18, 0, 13, 0, 0, 32, 42, 0, 36, 0, 12, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 7, 35, 10, 75, 45, 21, 11, 0, 4, 19, 11, 56, 30, 0, 27, 0, 26, 26, 17, 23, 21, 16, 36, 17, 42, 16, 17, 27, 23, 39, 34, 38, 34, 38, 61, 30, 29, 14, 0, 71, 23, 65, 51, 0, 25, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 42, 0, 0, 10, 19, 0, 0, 0, 0, 0, 50, 0, 40, 29, 20, 20, 0, 0, 24, 0, 28, 0, 0, 0, 0, 0, 0, 45, 43, 39, 48, 11, 30, 6, 56, 15, 25, 22, 7, 10, 0, 6, 13, 24, 0];
//		for(var i = 0; i<678; i++){
//			
//		}
		
		function drawscatterchart(data1, data2){  //要改1
			var wi2 = 415, he2 = 300, padding2 = {top:75, bottom:30, left:35, right:25} 
			d3.selectAll(".text8").remove()
			d3.selectAll(".rect9").remove()
			d3.select(".svg2").remove()
			d3.select(".cheakbox").remove()
			d3.select(".msgtip").remove()
			var circlehaha = [], circlehaha1 = [], className1 = "circle8", className2 = "circle9", zoomk = 1, pathclassname1 = "path1", pathclassname2 = "path2";
			for(var k = 0; k<data1.length; k++){
				circlehaha.push([
					k+1,
					data1[k]
				])
				circlehaha1.push([
					k+1,
					data2[k]
				])
			}
//			console.log(circlehaha)
			var xaxS = wi2-padding2.left-padding2.right;
		    var yaxS = he2-padding2.top-padding2.bottom;
		    var xScaSupdate, a1 = 1, a2 = 678, a3, flagpp;
			var xScaS = d3.scaleLinear()
		                 .domain([a1, a2*1.01])
		                 .range([0, xaxS]);
			var yScaS = d3.scaleLinear()
		                 .domain([0, d3.max([d3.max(data1), d3.max(data2)])])
		                 .range([yaxS,0]);
		    var differencetip = d3.select("#buju4")
                            .append("div")
                            .attr("class","msgtip")
			function drawScatterplot(){
				var svg2 = d3.select("#buju4").append("svg")
							 .attr("width", wi2)
							 .attr("height", he2)
						 	 .attr("class", "svg2")
			              
			    var xAxisS = d3.axisBottom(xScaS)
			    			   .ticks(8)
			              
				var yAxisS = d3.axisLeft(yScaS)
							   .ticks(5)
				
				var gXS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-padding2.bottom)+")")
				            .attr("class","gxS")
				            .call(xAxisS)
				
				var gYS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-yaxS-padding2.bottom)+")")
				            .attr("class", "gyS")
				            .call(yAxisS);
				
			}
			
			
			function drawCircleRaw(data, color, circleClass, pathclass){
				var circle = d3.select('.gs').selectAll(circleClass)
								                    .data(data)
								                    .enter()
								                    .append("circle")
								                    .attr("fill",color)
								                    .attr("cx",(d,i)=>padding2.left + xScaS(d[0]))
								                    .attr("cy",(d,i)=>padding2.top+ yScaS(d[1]))
								                    .attr("r",2)
								                    .attr("class", circleClass)
								                    .on("mouseover", function(d, i){
								                    	let v1, v2, v3, v4;
								                    	v1 = d[0]
								                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
								                    	v3 = circlehaha1[v1-1][1] 
								                    	v4 = Math.abs(v2-v3)
								                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
								                    	$(".msgtip").css("display", "block")
								                    	if(mode_flag == 2){
								                    		for(var j=1; j<679; j++){
									                    		if(j == v1){
									                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
									                    		}else{
									                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
									                    		}
									                    	}
								                    	}
								                    })
								                    .on("mouseout", function(d,i){
								                    	$(".msgtip").css("display", "none")
								                    	$(".msgtip p").remove();
								                    	for(var j=1; j<679; j++){
								                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
								                    	}
								                    });
				var linepath = d3.line()
//								 .curve(d3.curveCatmullRom.alpha(0.9))
								 .x(function(d){return xScaS(d[0]);})
								 .y(function(d){return yScaS(d[1]);});
				
				d3.select('.gs').append("path")
								.attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
								.attr("d", linepath(data))
								.attr("fill", "none")
								.attr("stroke-width", 1)
								.attr("stroke", color)
								.attr("class", pathclass)
			}
//			function showmassage(){
//				console.log(this)
//			}
			function drawCircle(data, color, circleClass, classcircle, pathClass, classpath){
					var datatrans = [];
					for(var i = 0; i<data.length; i++){
						if(data[i][0]>=Math.floor(a1) && data[i][0]<=Math.floor(a2))
						datatrans.push([
							data[i][0],
							data[i][1]
						])
					}
					d3.select(pathClass).remove();
					var linepath = d3.line()
//								 .curve(d3.curveCatmullRom.alpha(0.8))
								 .x(function(d){return xScaSupdate(d[0]);})
								 .y(function(d){return yScaS(d[1]);});
					d3.select('.gs').append("path")
								.attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
								.attr("d", linepath(datatrans))
								.attr("fill", "none")
								.attr("stroke-width", 1*zoomk)
								.attr("stroke", color)
								.attr("class", classpath)
	//				console.log(data.length, datatrans.length)
			    	var circleUpdate = gs.selectAll(circleClass)
			    	                      .data(datatrans);
			    	                      
			    	var circleEnter = circleUpdate.enter();
			    	
			    	var circleExit = circleUpdate.exit();
			    	
			    	circleUpdate.attr("cx",function(d){
			    	            	return padding2.left + xScaSupdate(d[0]);
			    	            })
			    	            .attr("cy",function(d){
			    	            	return padding2.top + yScaS(d[1]);
			    	            })
			    	            .attr("r",2*zoomk)
			    	            .attr("class", classcircle)
			    	            .on("mouseover", function(d, i){
			                    	let v1, v2, v3, v4;
			                    	v1 = d[0]
			                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
			                    	v3 = circlehaha1[v1-1][1] 
			                    	v4 = Math.abs(v2-v3)
			                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
			                    	$(".msgtip").css("display", "block")
			                    	if(mode_flag == 2){
			                    		for(var j=1; j<679; j++){
				                    		if(j == v1){
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
				                    		}else{
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
				                    		}
				                    	}
			                    	}
			                    })
			                    .on("mouseout", function(d,i){
			                    	$(".msgtip").css("display", "none")
			                    	$(".msgtip p").remove();
			                    	for(var j=1; j<679; j++){
			                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
			                    	}
			                    });
			    	            
			    	circleEnter.append("circle")
			    	           .attr("fill", color)
			                   .attr("cx",(d,i)=>padding2.left + xScaSupdate(d[0]))
			                   .attr("cy",(d,i)=>padding2.top + yScaS(d[1]))
			                   .attr("r",2*zoomk)
			                   .attr("class", classcircle)
			                   .on("mouseover", function(d, i){
			                    	let v1, v2, v3, v4;
			                    	v1 = d[0]
			                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
			                    	v3 = circlehaha1[v1-1][1] 
			                    	v4 = Math.abs(v2-v3)
			                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
			                    	$(".msgtip").css("display", "block")
			                    	if(mode_flag == 2){
			                    		for(var j=1; j<679; j++){
				                    		if(j == v1){
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
				                    		}else{
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
				                    		}
				                    	}
			                    	}
			                    })
			                    .on("mouseout", function(d,i){
			                    	$(".msgtip").css("display", "none")
			                    	$(".msgtip p").remove();
			                    	for(var j=1; j<679; j++){
			                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
			                    	}
			                    });
			                   
			        circleExit.remove();
			    }
			drawScatterplot();
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 135)
							  .attr("y", 30)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "13px")
							  .attr("class", "text7")
							  .text("True-Predicted chart")
			let datalegendc = ["#ea5c68", "#100a0a"], datalegendt = ["True", "Predict"]
			d3.select('.svg2').selectAll('.legendc')
							  .data(datalegendc)
							  .enter()
							  .append("circle")
							  .attr("fill", (d,i)=>d)
							  .attr("cx", (d, i)=> 140+i*100)
							  .attr("cy", 50)
							  .attr("r", 3)
							  .attr("class", "legendc")
			d3.select('.svg2').selectAll('.linel')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 125+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 140+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "linel")
			d3.select('.svg2').selectAll('.liner')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 140+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 155+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "liner")
			d3.select('.svg2').selectAll('.legendt')
							  .data(datalegendt)
							  .enter()
							  .append('text')
							  .attr("fill", (d,i)=>datalegendc[i])
							  .attr("x", (d, i)=> 165+i*100)
							  .attr("y", 53)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "11px")
							  .attr("class", "legendt")
							  .text(function(d){return d})
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 15)
							  .attr("y", 65)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "9px")
							  .attr("class", "text9")
							  .text("car")
//							  .attr("transform","rotate(20, 45, 80)")
//							  .style('writing-mode','tb-rl')
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 385)
							  .attr("y", 295)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "9px")
							  .attr("class", "text10")
							  .text("Road")
//							  .attr("transform","rotate(20, 380, 250)")
			var zoom = d3.zoom()  
			            .scaleExtent([1,2])//用于设置最小和最大的缩放比例  
			            .wheelDelta(function wheelDelta() {
						  return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 899;
						})
			            .on("zoom",zoomed) 
			var gs = d3.select('.svg2').append("g")
									   .attr("class", "gs")
									   .call(zoom)
									   .on("mousedown.zoom", null);;
			gs.append("rect")
			   .attr("class", "piupiu")
			   .attr("x", padding2.left)
			   .attr("y", padding2.top)
			   .attr("width", xaxS)
			   .attr("height", yaxS)
			   .on("mousedown", function(d){
			   	d3.select(this).style("cursor", "ew-resize")
			   		a3 = d3.event.clientX
				   	d3.select(this).on("mousemove", function(d){
				   		flagpp = d3.event.clientX - a3
				   		a3 = d3.event.clientX
	//			   		console.log(flag)
				   		if(flagpp>0){
				   			if(a1-1<1){
				   				a1 = 1;
				   				a2 = a2;
				   			}else{
				   				a1 = a1 -1;
				   				a2 = a2 -1;
				   			}
				   		}else{
				   			if(a2+1>678){
				   				a1 = a1;
				   				a2 = 678;
				   			}else{
				   				a1 = a1 +1;
				   				a2 = a2 +1;
				   			}
				   		}
	//			   		console.log(Math.floor(a1), Math.floor(a2))
				   		axis = d3.select('.gxS').data([]);
			   			axis.exit().remove();
					    xScaSupdate = d3.scaleLinear()
					                 .domain([Math.floor(a1), Math.floor(a2)])
					                 .range([0, xaxS]);
					   	var axisBottom = d3
				            .axisBottom(xScaSupdate)
				            .ticks(8);
				        var gXS = d3.select('.svg2').append("g")
										            .attr("transform","translate("+(padding2.left)+","+(he2-padding2.bottom)+")")
										            .attr("class","gxS")
										            .call(axisBottom)
				   		drawCircle(circlehaha, "#100a0a", ".circle8", className1, ".path1", pathclassname1);
						drawCircle(circlehaha1, "#ea5c68", ".circle9", className2, ".path2", pathclassname2);
					})
			   	
		   })
		   .on("mouseup", function(){
		   			d3.select(this).style("cursor", "default")
		   			d3.select(this).on("mousemove", null)
		   })
			
			drawCircleRaw(circlehaha, "#100a0a", className1, pathclassname1);  //预测值
			drawCircleRaw(circlehaha1, "#ea5c68 ", className2, pathclassname2);//真实值
			
			function zoomed(){
				zoomk = d3.event.transform.k;
	//			console.log(d3.event, k)
			   	var devent = d3.event.sourceEvent.clientX-1530;
			   	axis = d3.select('.gxS').data([]);
			   	axis.exit().remove();
			   	if(zoomk>1.9){
			   		if(xScaS.invert(devent)-5<1){
			   			a1 = 1;
			   		}else{
			   			a1 = xScaS.invert(devent)-5;
			   		}
			   		if(xScaS.invert(devent)+5>678){
			   			a2 = 678;
			   		}else{
			   			a2 = xScaS.invert(devent)+5;
			   		}
			   	}else{
			   		a1 = xScaS.invert(devent)-(xScaS.invert(devent)-1)*(2-zoomk);
			   		a2 = xScaS.invert(devent)+(678 - xScaS.invert(devent))*(2-zoomk);
			   	}
	//		   	console.log(xScaS.invert(devent), devent, Math.floor(a1), Math.floor(a2))
			    xScaSupdate = d3.scaleLinear()
			                 .domain([Math.floor(a1), Math.floor(a2)])
			                 .range([0, xaxS]);
			   	var axisBottom = d3
		            .axisBottom(xScaSupdate)
		            .ticks(8);
		            
		        var gXS = d3.select('.svg2').append("g")
								            .attr("transform","translate("+(padding2.left)+","+(he2-padding2.bottom)+")")
								            .attr("class","gxS")
								            .call(axisBottom)
				drawCircle(circlehaha, "#100a0a", ".circle8", className1, ".path1", pathclassname1);
				drawCircle(circlehaha1, "#ea5c68 ", ".circle9", className2, ".path2", pathclassname2);
		    }
		}


		function drawscatterchart_test(data1, data2, data3){  //要改1
			var wi2 = 415, he2 = 300, padding2 = {top:75, bottom:30, left:35, right:25} 
			d3.selectAll(".text8").remove()
			d3.selectAll(".rect9").remove()
			d3.select(".svg2").remove()
			d3.select(".cheakbox").remove()
			d3.select(".msgtip").remove()
			var circlehaha = [], circlehaha1 = [], circlehaha2 = [], className1 = "circle8", className2 = "circle9", className3 = "circle91", zoomk = 1, pathclassname1 = "path1", pathclassname2 = "path2", pathclassname3 = "path3";
			for(var k = 0; k<data1.length; k++){
				circlehaha.push([
					k+1,
					data1[k]
				])
				circlehaha1.push([
					k+1,
					data2[k]
				])
				circlehaha2.push([
					k+1,
					data3[k]
				])
			}
//			console.log(circlehaha)
			var xaxS = wi2-padding2.left-padding2.right;
		    var yaxS = he2-padding2.top-padding2.bottom;
		    var xScaSupdate, a1 = 1, a2 = 678, a3, flagpp;
			var xScaS = d3.scaleLinear()
		                 .domain([a1, a2*1.01])
		                 .range([0, xaxS]);
			var yScaS = d3.scaleLinear()
		                 .domain([0, d3.max([d3.max(data1), d3.max(data2)])])
		                 .range([yaxS,0]);
		    var differencetip = d3.select("#buju4")
                            .append("div")
                            .attr("class","msgtip")
			function drawScatterplot(){
				var svg2 = d3.select("#buju4").append("svg")
							 .attr("width", wi2)
							 .attr("height", he2)
						 	 .attr("class", "svg2")
			              
			    var xAxisS = d3.axisBottom(xScaS)
			    			   .ticks(8)
			              
				var yAxisS = d3.axisLeft(yScaS)
							   .ticks(5)
				
				var gXS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-padding2.bottom)+")")
				            .attr("class","gxS")
				            .call(xAxisS)
				
				var gYS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-yaxS-padding2.bottom)+")")
				            .attr("class", "gyS")
				            .call(yAxisS);
				
			}
			
			
			function drawCircleRaw(data, color, circleClass, pathclass){
				var circle = d3.select('.gs').selectAll(circleClass)
								                    .data(data)
								                    .enter()
								                    .append("circle")
								                    .attr("fill",color)
								                    .attr("cx",(d,i)=>padding2.left + xScaS(d[0]))
								                    .attr("cy",(d,i)=>padding2.top+ yScaS(d[1]))
								                    .attr("r",2)
								                    .attr("class", circleClass)
								                    .on("mouseover", function(d, i){
								                    	let v1, v2, v3, v4;
								                    	v1 = d[0]
								                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
								                    	v3 = circlehaha1[v1-1][1] 
								                    	v4 = Math.abs(v2-v3)
								                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
								                    	$(".msgtip").css("display", "block")
								                    	if(mode_flag == 2){
								                    		for(var j=1; j<679; j++){
									                    		if(j == v1){
									                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
									                    		}else{
									                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
									                    		}
									                    	}
								                    	}
								                    })
								                    .on("mouseout", function(d,i){
								                    	$(".msgtip").css("display", "none")
								                    	$(".msgtip p").remove();
								                    	for(var j=1; j<679; j++){
								                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
								                    	}
								                    });
				var linepath = d3.line()
//								 .curve(d3.curveCatmullRom.alpha(0.9))
								 .x(function(d){return xScaS(d[0]);})
								 .y(function(d){return yScaS(d[1]);});
				
				d3.select('.gs').append("path")
								.attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
								.attr("d", linepath(data))
								.attr("fill", "none")
								.attr("stroke-width", 1)
								.attr("stroke", color)
								.attr("class", pathclass)
			}
//			function showmassage(){
//				console.log(this)
//			}
			function drawCircle(data, color, circleClass, classcircle, pathClass, classpath){
					var datatrans = [];
					for(var i = 0; i<data.length; i++){
						if(data[i][0]>=Math.floor(a1) && data[i][0]<=Math.floor(a2))
						datatrans.push([
							data[i][0],
							data[i][1]
						])
					}
					d3.select(pathClass).remove();
					var linepath = d3.line()
//								 .curve(d3.curveCatmullRom.alpha(0.8))
								 .x(function(d){return xScaSupdate(d[0]);})
								 .y(function(d){return yScaS(d[1]);});
					d3.select('.gs').append("path")
								.attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
								.attr("d", linepath(datatrans))
								.attr("fill", "none")
								.attr("stroke-width", 1*zoomk)
								.attr("stroke", color)
								.attr("class", classpath)
	//				console.log(data.length, datatrans.length)
			    	var circleUpdate = gs.selectAll(circleClass)
			    	                      .data(datatrans);
			    	                      
			    	var circleEnter = circleUpdate.enter();
			    	
			    	var circleExit = circleUpdate.exit();
			    	
			    	circleUpdate.attr("cx",function(d){
			    	            	return padding2.left + xScaSupdate(d[0]);
			    	            })
			    	            .attr("cy",function(d){
			    	            	return padding2.top + yScaS(d[1]);
			    	            })
			    	            .attr("r",2*zoomk)
			    	            .attr("class", classcircle)
			    	            .on("mouseover", function(d, i){
			                    	let v1, v2, v3, v4;
			                    	v1 = d[0]
			                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
			                    	v3 = circlehaha1[v1-1][1] 
			                    	v4 = Math.abs(v2-v3)
			                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
			                    	$(".msgtip").css("display", "block")
			                    	if(mode_flag == 2){
			                    		for(var j=1; j<679; j++){
				                    		if(j == v1){
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
				                    		}else{
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
				                    		}
				                    	}
			                    	}
			                    })
			                    .on("mouseout", function(d,i){
			                    	$(".msgtip").css("display", "none")
			                    	$(".msgtip p").remove();
			                    	for(var j=1; j<679; j++){
			                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
			                    	}
			                    });
			    	            
			    	circleEnter.append("circle")
			    	           .attr("fill", color)
			                   .attr("cx",(d,i)=>padding2.left + xScaSupdate(d[0]))
			                   .attr("cy",(d,i)=>padding2.top + yScaS(d[1]))
			                   .attr("r",2*zoomk)
			                   .attr("class", classcircle)
			                   .on("mouseover", function(d, i){
			                    	let v1, v2, v3, v4;
			                    	v1 = d[0]
			                    	v2 = circlehaha[v1-1][1]  //如果circlehaha为真实值
			                    	v3 = circlehaha1[v1-1][1] 
			                    	v4 = Math.abs(v2-v3)
			                    	$(".msgtip").append('<p>Road : '+v1+' </br>True : '+v3+'</br>Predicted : '+v2+'</br>Difference : '+v4+'</p>')
			                    	$(".msgtip").css("display", "block")
			                    	if(mode_flag == 2){
			                    		for(var j=1; j<679; j++){
				                    		if(j == v1){
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 13)
				                    		}else{
				                    			d3.select(".road"+(j-1)).attr("stroke-width", 3)
				                    		}
				                    	}
			                    	}
			                    })
			                    .on("mouseout", function(d,i){
			                    	$(".msgtip").css("display", "none")
			                    	$(".msgtip p").remove();
			                    	for(var j=1; j<679; j++){
			                    		d3.select(".road"+(j-1)).attr("stroke-width", 3)
			                    	}
			                    });
			                   
			        circleExit.remove();
			    }
			drawScatterplot();
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 135)
							  .attr("y", 30)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "13px")
							  .attr("class", "text7")
							  .text("True-Predicted chart")
			let datalegendc = ["#ea5c68", "#100a0a", "#9400D3"], datalegendt = ["True", "Predict1", "Predict2"]
			d3.select('.svg2').selectAll('.legendc')
							  .data(datalegendc)
							  .enter()
							  .append("circle")
							  .attr("fill", (d,i)=>d)
							  .attr("cx", (d, i)=> 80+i*100)
							  .attr("cy", 50)
							  .attr("r", 3)
							  .attr("class", "legendc")
			d3.select('.svg2').selectAll('.linel')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 65+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 80+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "linel")
			d3.select('.svg2').selectAll('.liner')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 80+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 95+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "liner")
			d3.select('.svg2').selectAll('.legendt')
							  .data(datalegendt)
							  .enter()
							  .append('text')
							  .attr("fill", (d,i)=>datalegendc[i])
							  .attr("x", (d, i)=> 105+i*100)
							  .attr("y", 53)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "11px")
							  .attr("class", "legendt")
							  .text(function(d){return d})
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 15)
							  .attr("y", 65)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "9px")
							  .attr("class", "text9")
							  .text("km/h")
//							  .attr("transform","rotate(20, 45, 80)")
//							  .style('writing-mode','tb-rl')
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 385)
							  .attr("y", 295)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "9px")
							  .attr("class", "text10")
							  .text("Road")
//							  .attr("transform","rotate(20, 380, 250)")
			var zoom = d3.zoom()  
			            .scaleExtent([1,2])//用于设置最小和最大的缩放比例  
			            .wheelDelta(function wheelDelta() {
						  return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 899;
						})
			            .on("zoom",zoomed) 
			var gs = d3.select('.svg2').append("g")
									   .attr("class", "gs")
									   .call(zoom)
									   .on("mousedown.zoom", null);;
			gs.append("rect")
			   .attr("class", "piupiu")
			   .attr("x", padding2.left)
			   .attr("y", padding2.top)
			   .attr("width", xaxS)
			   .attr("height", yaxS)
			   .on("mousedown", function(d){
			   	d3.select(this).style("cursor", "ew-resize")
			   		a3 = d3.event.clientX
				   	d3.select(this).on("mousemove", function(d){
				   		flagpp = d3.event.clientX - a3
				   		a3 = d3.event.clientX
	//			   		console.log(flag)
				   		if(flagpp>0){
				   			if(a1-1<1){
				   				a1 = 1;
				   				a2 = a2;
				   			}else{
				   				a1 = a1 -1;
				   				a2 = a2 -1;
				   			}
				   		}else{
				   			if(a2+1>678){
				   				a1 = a1;
				   				a2 = 678;
				   			}else{
				   				a1 = a1 +1;
				   				a2 = a2 +1;
				   			}
				   		}
	//			   		console.log(Math.floor(a1), Math.floor(a2))
				   		axis = d3.select('.gxS').data([]);
			   			axis.exit().remove();
					    xScaSupdate = d3.scaleLinear()
					                 .domain([Math.floor(a1), Math.floor(a2)])
					                 .range([0, xaxS]);
					   	var axisBottom = d3
				            .axisBottom(xScaSupdate)
				            .ticks(8);
				        var gXS = d3.select('.svg2').append("g")
										            .attr("transform","translate("+(padding2.left)+","+(he2-padding2.bottom)+")")
										            .attr("class","gxS")
										            .call(axisBottom)
				   		drawCircle(circlehaha, "#100a0a", ".circle8", className1, ".path1", pathclassname1);
						drawCircle(circlehaha1, "#ea5c68", ".circle9", className2, ".path2", pathclassname2);
						drawCircle(circlehaha2, "#21D839", ".circle91", className3, ".path3", pathclassname3);
					//*****************************************改过************************************************
					})
			   	
		   })
		   .on("mouseup", function(){
		   			d3.select(this).style("cursor", "default")
		   			d3.select(this).on("mousemove", null)
		   })
			
			
			function zoomed(){
				zoomk = d3.event.transform.k;
	//			console.log(d3.event, k)
			   	var devent = d3.event.sourceEvent.clientX-1530;
			   	axis = d3.select('.gxS').data([]);
			   	axis.exit().remove();
			   	if(zoomk>1.9){
			   		if(xScaS.invert(devent)-5<1){
			   			a1 = 1;
			   		}else{
			   			a1 = xScaS.invert(devent)-5;
			   		}
			   		if(xScaS.invert(devent)+5>678){
			   			a2 = 678;
			   		}else{
			   			a2 = xScaS.invert(devent)+5;
			   		}
			   	}else{
			   		a1 = xScaS.invert(devent)-(xScaS.invert(devent)-1)*(2-zoomk);
			   		a2 = xScaS.invert(devent)+(678 - xScaS.invert(devent))*(2-zoomk);
			   	}
	//		   	console.log(xScaS.invert(devent), devent, Math.floor(a1), Math.floor(a2))
			    xScaSupdate = d3.scaleLinear()
			                 .domain([Math.floor(a1), Math.floor(a2)])
			                 .range([0, xaxS]);
			   	var axisBottom = d3
		            .axisBottom(xScaSupdate)
		            .ticks(8);
		            
		        var gXS = d3.select('.svg2').append("g")
								            .attr("transform","translate("+(padding2.left)+","+(he2-padding2.bottom)+")")
								            .attr("class","gxS")
								            .call(axisBottom)
				drawCircle(circlehaha, "#100a0a", ".circle8", className1, ".path1", pathclassname1);
				drawCircle(circlehaha1, "#ea5c68 ", ".circle9", className2, ".path2", pathclassname2);
				drawCircle(circlehaha2, "#21D839 ", ".circle91", className3, ".path3", pathclassname3);
		    }
		}

		function testdrawline(){
			var wi2 = 415, he2 = 300, padding2 = {top:75, bottom:30, left:35, right:25} 
			var xaxS = wi2-padding2.left-padding2.right;
		    var yaxS = he2-padding2.top-padding2.bottom;
		    var xScaSupdate, a1 = 1, a2 = 678, a3, flagpp;
			var xScaS = d3.scaleBand()
		                 .domain(["1/6", "1/7", "1/8", "1/9", "1/10", "1/11", "1/12"])
		                 .range([0, xaxS]);
			var yScaS = d3.scaleLinear()
		                 .domain([0, 60])
		                 .range([yaxS,0]);
			function drawScatterplot(){
				var svg2 = d3.select("#buju4").append("svg")
							 .attr("width", wi2)
							 .attr("height", he2)
						 	 .attr("class", "svg2")
			              
			    var xAxisS = d3.axisBottom(xScaS)
			    			   .ticks(8)
			              
				var yAxisS = d3.axisLeft(yScaS)
							   .ticks(5)
				
				var gXS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-padding2.bottom)+")")
				            .attr("class","gxS")
				            .call(xAxisS)
				
				var gYS = svg2.append("g")
				            .attr("transform","translate("+padding2.left+","+(he2-yaxS-padding2.bottom)+")")
				            .attr("class", "gyS")
				            .call(yAxisS);
				
			}
			drawScatterplot()
			var usedata1 = [[0, 45], [1, 35], [2, 32], [3, 40], [4, 42], [5, 45], [6, 50]]
			var usedata2 = [[0, 48], [1, 32], [2, 29], [3, 39], [4, 42], [5, 42], [6, 55]]  //r368

			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 135)
							  .attr("y", 30)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "13px")
							  .attr("class", "text7")
							  .text("True-Predicted chart")
			let datalegendc = ["#ea5c68", "#100a0a"], datalegendt = ["True", "Predicted"]
			d3.select('.svg2').selectAll('.legendc')
							  .data(datalegendc)
							  .enter()
							  .append("circle")
							  .attr("fill", (d,i)=>d)
							  .attr("cx", (d, i)=> 130+i*100)
							  .attr("cy", 50)
							  .attr("r", 3)
							  .attr("class", "legendc")
			d3.select('.svg2').selectAll('.linel')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 115+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 130+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "linel")
			d3.select('.svg2').selectAll('.liner')
							  .data(datalegendc)
							  .enter()
							  .append("line")
							  .attr("x1", (d, i)=> 130+i*100)
							  .attr("y1", 50)
							  .attr("x2", (d, i)=> 145+i*100)
							  .attr("y2", 50)
							  .attr("stroke", (d,i)=>d)
							  .attr("class", "liner")
			d3.select('.svg2').selectAll('.legendt')
							  .data(datalegendt)
							  .enter()
							  .append('text')
							  .attr("fill", (d,i)=>datalegendc[i])
							  .attr("x", (d, i)=> 155+i*100)
							  .attr("y", 53)
							  .style("font-weight", "600")
			                  .style("font-family", "georgia")
			                  .style("font-size", "11px")
							  .attr("class", "legendt")
							  .text(function(d){return d})
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 14)
							  .attr("y", 63)
							  .style("font-weight", "600")
			                  .style("font-family", "Times New Roman")
			                  .style("font-size", "11px")
							  .attr("class", "text9")
							  .text("km/h")
			d3.select('.svg2').append('text')
							  .attr("fill", "black")
							  .attr("x", 365)
							  .attr("y", 30)
							  .style("font-weight", "600")
			                  .style("font-family", "Times New Roman")
			                  .style("font-size", "12px")
							  .attr("class", "text9")
							  .text("R368")
			var linepath = d3.line()
//							 .curve(d3.curveCatmullRom.alpha(0.9))
							 .x(function(d, i){return xScaS.step()*(i+0.5);})
							 .y(function(d, i){return yScaS(d[1]);});
			
			var g = d3.select(".svg2").append("g")
			var testpath1 = g.append('path')
							  .attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
							  .attr("d", linepath(usedata2))
							  .attr("fill", "none")
							  .attr("stroke-width", 2.5)
							  .attr("stroke", "#100a0a")
							  .attr("class", "testpath1")
			var testpath2 = g.append('path')
							  .attr("transform", "translate("+ padding2.left +", "+ (padding2.top) +")")
							  .attr("d", linepath(usedata1))
							  .attr("fill", "none")
							  .attr("stroke-width", 2.5)
							  .attr("stroke", "#ea5c68")
							  .attr("class", "testpath2")
			
			
			var testcircle1 = g.selectAll(".testcircle1")
								.data(usedata2)
								.enter()
								.append('circle')
							    .attr("cx",(d,i)=>padding2.left + xScaS.step()*(i+0.5))
			                    .attr("cy",(d,i)=>padding2.top + yScaS(d[1]))
			                    .attr("r", 3.3)
			                    .attr("opacity", 1)
							  	.attr("fill", "#100a0a")
							  	.attr("class", "testcircle1")
			var testcircle2 = g.selectAll(".testcircle2")
								.data(usedata1)
								.enter()
								.append('circle')
							    .attr("cx",(d,i)=>padding2.left + xScaS.step()*(i+0.5))
			                    .attr("cy",(d,i)=>padding2.top + yScaS(d[1]))
			                    .attr("r", 3.3)
							  	.attr("fill", "#ea5c68")
							  	.attr("opacity", 1)
							  	.attr("class", "testcircle1")
		}
		
		
		var data_show = {"one" :[1, 2, 3, 4, 5], "two":[6, 7, 8, 9, 10], "zero":[11, 13, 12, 14, 15], "three":[16, 17, 18, 19, 20], "other":[21, 22, 23, 24, 25], "pre":[200, 400, 200, 80, 120]}

		$("#pieChart").on("click", function(){
			drawPiechart(data_show);
		})
		$("#lineChart").on("click", function(){
			drawLinechartAxis();
			linechartUpdata(dataLine);
		})
		$("#Hchart").on("click", function(){
			drawscatterchart(scatterdata1, scatterdata2);
		})
//*******************************************************饼状图显示预测与真实值之间的差距*******************************************************************************************************************************************************************************************************************************//
		
		function drawheatmap(A){
			var datatt;
			var points = [];
			let tempp;
			let vall = A[A.length-1]
			let fff = d3.max(vall)
			for (var i = 0; i<A.length-1; i++){
				for (var j = 0; j<A[i].R.length-1; j++){
					if(vall[i]< fff/3){tempp = 20}else if(vall[i]< (2*fff)/3){tempp = 13}else{tempp = 7}
					createdata(tempp, 0.0010, A[i].R[j], A[i].R[j+1], vall[i])
				}
			}
//			console.log(datatt)
			datatt = {'max': fff, 'data':points}
			console.log(datatt)
			var heatmap_layer = new HeatmapOverlay(heatmap_cfg).addTo(map);
			heatmap_layer.setData(datatt);
			
			
			function createdata(number, radius, A, B, C) {
				var len = number;
//				var points = [];
				var max = 0; //单点最大值
				var a = parseFloat(A.lat),
					b = parseFloat(B.lat),
					a1 = parseFloat(A.lng),
					b1 = parseFloat(B.lng);
				var min1 = d3.min([a, a1]),
					max1 = d3.max([a, a1]),
					min2 = d3.min([b, b1]),
					max2 = d3.max([b, b1])
				var x = d3.scaleLinear()
					.domain([0, 1])
					.range([a, b])
			
				var y = d3.scaleLinear()
					.domain([0, 1])
					.range([a1, b1])
				for (; number > 0; number--) {
					var Q = number / len;
					var val = number;
					max = Math.max(max, val);
					var point = {
						"lat": x(Q), //经度
						"lng": y(Q), //纬度
						"count": val, //数据量大小
						"radius": radius
					};
					points.push(point);
				}
//				return points
			};
		};
					
					
		var hahahah = [[28.02006912, 120.63227844], [28.01951981, 120.63233185], [28.01811981, 120.63223267], [28.01715088, 120.62975311], [28.01370049, 120.62796783], [28.01000023, 120.62532043], [28.01082993, 120.62272644], [28.01111984, 120.62180328]]
		// #F2AF1A #74F21A rgb(242,196,26) rgb(103,242,26)
		var testdata = []
		for(k = 0; k < hahahah.length; k++){
			var testpoint = {
				"lat": hahahah[k][0], //经度
				"lng": hahahah[k][1], //纬度
				"count": k, //数据量大小
				"radius": 0.0001,
			}
			testdata.push(testpoint);
		}
		dataheatmap = {'max': 100, 'data': testdata}
		const c5 = d3.rgb(255,121,0);    //红色  
		const c6 = d3.rgb(219,255,0);    //绿色 
		var flowMax = 30
		var flow_co = d3.interpolate(c5,c6); 
		var linear_flow = d3.scaleLinear()  
			           .domain([0,flowMax])  
			           .range([0,1]);
	    var heatmap_cfg={
	        "radius":"radius",          //设置每一个热力点的半径
	        "maxOpacity":.5,           //设置最大的不透明度
	        "scaleRadius":true,         //设置热力点是否平滑过渡
	        "blur": 0.95,               //系数越高，渐变越平滑，默认是0.85,
	                                    //滤镜系数将应用于所有热点数据。
	        "useLocalExtrema": false,    //使用局部极值
	        "latField":"lat",           //纬度
	        "lngField":"lng",           //经度
	        "valueField":"value",       //热力点的值
	      "gradient": {   
//	      				"0.99": "rgba(255,0,0,1)",
//	//						"1": "rgba(252,185,126, 1)",
//	                      "0.7": "rgba(255,157,70,1)",
//	                      "0.6": "rgba(255,185,70,1)",
//	                      "0.4": "rgba(255,193,70,1)",
//	                      "0": "rgba(255,240,70,1)"
						  '.01': flow_co(linear_flow(flowMax * 0.01)),
				          '.5': flow_co(linear_flow(flowMax * 0.1)),
				          '.99': flow_co(linear_flow(flowMax * 0.99)),
//				          '.1': flow_co(linear_flow(flowMax * 0.1)),
//				          '.2': flow_co(linear_flow(flowMax * 0.2)),
//				          '.3': flow_co(linear_flow(flowMax * 0.3)),
//				           '.4': flow_co(linear_flow(flowMax * 0.4)),
//				          '.5': flow_co(linear_flow(flowMax * 0.5)),
//				          '.6': flow_co(linear_flow(flowMax * 0.6)),
//				          '.7': flow_co(linear_flow(flowMax * 0.7)),
//				          '.8': flow_co(linear_flow(flowMax * 0.8)),
//				          '.99': flow_co(linear_flow(flowMax * 0.99)),
	                  }
	    }
	    
//	    var heatmap_layer = new HeatmapOverlay(heatmap_cfg).addTo(map);
//			heatmap_layer.setData(dataheatmap);
//*******************************************热力图**************************************************//

		//布局js
		$(".flatpickr").flatpickr();
		$(".flatpickr1").flatpickr();
		// 添加新的道路信息框
		
		data_road = [{'Name':'road1','averageflow':"0",'averagespeed':"0",'V3':"none"}, {'Name':'road2','averageflow':"0",'averagespeed':"0",'V3':"none"}, 
			{'Name':'road3','averageflow':"0",'averagespeed':"0",'V3':"none"}, {'Name':'road4','averageflow':"0",'averagespeed':"0",'V3':"none"}, 
			{'Name':'road5','averageflow':"0",'averagespeed':"0",'V3':"none"}, {'Name':'road6','averageflow':"0",'averagespeed':"0",'V3':"none"},
			{'Name':'road7','averageflow':"0",'averagespeed':"0",'V3':"none"}
			];
		
		function tianjiantable(A, B){
				$('#Msgtable' + String(B)).bootstrapTable({
				data: A,
			    showHeader : false,
			    showColumns : false,
			    showRefresh : false,
			    pagination: false,//分页
			    pageNumber : 1,
			    search: false,//显示搜索框
			    striped: false,
			    onClickRow: function (row, tr, field) {
			    		delect_d.push(row)
						$(tr).remove()
			    	},
			    //表格的列
			    columns: [
			        {
			            field: 'Name',//域值
			            title: 'Name',//标题
			            visible: true,//false表示不显示
			            sortable: true,//启用排序
			            width : '15%',
			        },
			        {
			            field: 'averagespeed',//域值
			            title: 'averagespeed',//标题
			            visible: true,//false表示不显示
			            sortable: true,//启用排序
			            width : '20%',
			            editable:true,
			        },
			        {
			            field: 'averageflow',//域值
			            title: 'averageflow',//标题
			            visible: true,//false表示不显示
			            sortable: true,//启用排序
			            width : '20%',
			            editable:true,
			        },
			        {
			            field: 'V3',//域值
			            title: 'V3',//标题
			            visible: true,//false表示不显示
			            sortable: true,//启用排序
			            width : '20%',
			            editable:true,
			        },
			    ]
			});
			$('td').css('padding','6px 4px 4px 8px');
//			$('th').css('padding','6px 4px 6px 12px');
		}
		var delect_d = []
		var data_haha = [], table_count = 1;
//		tianjiantable(data_piu);
		
		var CollapseContainer = document.getElementById("MsgAccordion");
		var CollapseContainer1 = document.getElementById("MsgAccordion1");
		var divChildList = [];
		
		function NewCollapseDiv(color,title,collapseID,divcon){
			let newDiv = document.createElement("div");
			newDiv.style = "margin: 0px 0px 0px 1px; border-top-right-radius: 0px; border-top-left-radius: 0px;"
			newDiv.className = "panel panel-default";
			newDiv.id = "table_div";
			let bodyDiv = document.createElement("div");
			bodyDiv.id = "collapse" + String(collapseID)
			bodyDiv.className = 'panel-collapse collapse'
			bodyDiv.className = 'in'
			let msgDiv = document.createElement("div");
			msgDiv.className = 'panel-body'
			msgDiv.id = "MsgContainer" + String(collapseID)
			msgDiv.style = "padding: 2px 2px 2px 2px;box-shadow: 4px 4px 4px #e9e8e8;"
			//内容只是例子
			msgDiv.innerHTML = '<table id="Msgtable' + String(collapseID) + '" style="font-size: 12px;"></table>'
			bodyDiv.appendChild(msgDiv)
			newDiv.appendChild(bodyDiv)
			divcon.appendChild(newDiv)
			divChildList.push(newDiv)
		}
		
		var taxi_flag = false, flow_flag = false, exit_taxi_flag = true, exit_road_flag = true;
		$("#tab").on("click", function(){
			taxi_flag = true;
			if(exit_road_flag){
				NewCollapseDiv("#14CA82","Road",0,CollapseContainer);
				tianjiantable(data_road, 0);
				exit_road_flag = false;
			}
		})
		
		$("#tab1").on("click", function(){
			taxi_flag = true;
			if(exit_taxi_flag){
				NewCollapseDiv("rgb(255, 127, 14)","Taxi",1,CollapseContainer)
				tianjiantable(data_taxi, 1)
				exit_taxi_flag = false;
			}
		})
		//举个例子，会删除
		
		NewCollapseDiv("rgb(255, 127, 14)","Road",0,CollapseContainer1);
		tianjiantable(data_road, 0);
		
		
		$("#cli_delect").on("click", function(){
			var setLength = divChildList.length;
			for(var l = 0; l<setLength; l++){
				let temp = divChildList.pop();
				temp.remove();
			}
			exit_taxi_flag = true;
			exit_road_flag = true;
		})

		$("#cli_test").on("click", function(){
			table_count++;
		})
		
		
		var drag_fala = false;
		$("#main_tool").draggable({
			cursor: "move",
			start: function(){
				drag_fala = true
			}
		})
		$( ".main_butt" ).on("click", function() {
			  if(!drag_fala){
				  	$(this).toggleClass( "active" );
				  	$(".icons").toggleClass( "open" );
			  }else{
			  	drag_fala = false;
			  }
			});
		
		var pre_test_flag = true;
		$("#pre_test").on("click", function(){
			$(this).toggleClass( "change_radius" );
			$("#pre_table").slideToggle(300)
			if(pre_test_flag){
				$("#pre_icon").removeClass("fa-chevron-down").addClass("fa-chevron-up");
				pre_test_flag = false;
			}else{
				$("#pre_icon").removeClass("fa-chevron-up").addClass("fa-chevron-down");
				pre_test_flag = true;
			}
		})
		var weathernumber = 0
		$(".weather_icon li").click(function(){
			if($(this).children().hasClass('wi-day-sunny')){
				weathernumber = 0
			}else if($(this).children().hasClass('wi-day-cloudy')){
				weathernumber = 1
			}else if($(this).children().hasClass('wi-day-hail')){
				weathernumber = 2
			}else if($(this).children().hasClass('wi-day-snow')){
				weathernumber = 3
			}else if($(this).children().hasClass('wi-day-haze')){
				weathernumber = 4
			}
			$(this).children().css("color", "yellow");
			$(".weather_icon li").not(this).children().css("color", "#D3D3D3")
			})
		var weeknumber = 9
		$(".week_text li").click(function(){
			if($(this).children().hasClass('one')){
				weeknumber = 0
			}else if($(this).children().hasClass('two')){
				weeknumber = 1
			}else if($(this).children().hasClass('three')){
				weeknumber = 2
			}else if($(this).children().hasClass('four')){
				weeknumber = 3
			}else if($(this).children().hasClass('five')){
				weeknumber = 4
			}else if($(this).children().hasClass('six')){
				weeknumber = 5
			}else if($(this).children().hasClass('seven')){
				weeknumber = 6
			}
			$(this).children().css("color", "yellow");
			$(".week_text li").not(this).children().css("color", "#D3D3D3")
			})
		var timelable = ["00:00", "06:00", "12:00", "18:00", "24:00"];
		
		$(".slider")
				.slider({ 
				    min: 0, 
				    max: 24, 
				    step: 1/2
				})
				.slider("pips", {
				    rest: "label",
				    step: 6
				})
				.slider("float");
		var title_svg = d3.select("#title_svg").append("svg")
											   .attr("width", 1125)
											   .attr("height", 30)
		var title_svg_g = title_svg.append("g")
								   .attr("class", "title_svg_g")
		var polygondata = [[0, 0], [175, 0], [190, 15], [175, 30], [0, 30]]
		var polygondata1 = [[950, 0], [1125, 0], [1125, 15], [1125, 30], [950, 30], [935, 15]] //yaogai
		function drawPoly(svgName,params, parcolor, className){
			svgName.append("svg:polygon")
				   .style("fill", parcolor)
			       .attr("class", className)
			       .attr("points", params);
		}
		drawPoly(title_svg_g,polygondata, "#2F2F2F", "p"), drawPoly(title_svg_g,polygondata1, "#2F2F2F", "p");
		
		var text_flow = title_svg_g.append("text")
							   	   .attr("class", "text_flow")
							       .attr("fill", "white")
							       .attr("x", 66)
							       .attr("y", 20)
							       .attr("font-family", "georgia")
							       .attr("font-size", "12px")
							       .style("font-weight", "600")
							       .text("Speed")
		
		var text_speed = title_svg_g.append("text")
							   	   .attr("class", "text_speed")
							       .attr("fill", "white")
							       .attr("x", 1016)
							       .attr("y", 20)
							       .attr("font-family", "georgia")
							       .attr("font-size", "12px")
							       .style("font-weight", "600")
							       .text("Flow")
		
		$("#addPOI").on("click", function(){
			NewPoiDiv();
		})
		
		var POI_contain = document.getElementById("POIcontain");
		var POIcontainList = [];
		

		function NewPoiDiv(){
			let newDiv = document.createElement("div");
			newDiv.style = "position: relative; width: 100%; height: 40px;"
			let newInput = document.createElement("input");
			newInput.className = 'selectPOI'
			newInput.style = "border-radius: 3px; position: absolute; left: 5px; top: 10px; height: 30px; width: 335px; outline: none;  font-family: georgia; z-index: 1; font-weight: 700;"
			let newI1 = document.createElement("i");
			newI1.className = 'fa fa-trash-o fa-stack-1x';
			newI1.id = 'trashDiv';
			newI1.style = "position: absolute; top: 11px; left: 350px; width: 20px; height: 20px; font-size: 20px; color: #5E6268;"
			let newI2 = document.createElement("i");
			newI2.className = 'fa fa-angle-down fa-stack-1x';
			newI2.id = 'selectDown';
			newI2.style = "z-index: 2; position: absolute; top: 11px; left: 320px; width: 20px; height: 20px; font-size: 20px; color: #5E6268;"
			let selectDiv = document.createElement("div");
			selectDiv.className = 'selectDiv';
			selectDiv.style = "display: none; z-index: 10; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; position: absolute; left: 5px; top: 40px; width: 335px; background: #F8F8F8; border-left: 1px solid silver; border-right: 1px solid silver; border-bottom: 1px solid silver;"
			let p1 = document.createElement("p");
			p1.style = "margin: 0px; width: 100%; height: 25px; text-align: center; line-height: 25px; font-family: georgia; font-weight: 700;";
			p1.innerHTML = "Gas station";
			let p2 = document.createElement("p");
			p2.style = "margin: 0px; position: relative; width: 100%; height: 25px; text-align: center; line-height: 25px; font-family: georgia; font-weight: 700;"
			p2.innerHTML = "Supermarket";
			let p3 = document.createElement("p");
			p3.style = "margin: 0px; position: relative; width: 100%; height: 25px; text-align: center; line-height: 25px; font-family: georgia; font-weight: 700;"
			p3.innerHTML = "Bank";
			let im = document.createElement("img");
			im.className = 'img';
			im.style = "z-index: 2; position: absolute; top: 15px; left: 15px; width: 22px; height: 20px; display: none;";
			selectDiv.appendChild(p1);
			selectDiv.appendChild(p2);
			selectDiv.appendChild(p3);
			newDiv.appendChild(newI1);
			newDiv.appendChild(newI2);
			newDiv.appendChild(newInput);
			newDiv.appendChild(selectDiv);
			newDiv.appendChild(im);
			POI_contain.appendChild(newDiv);
			POIcontainList.push(newDiv);
			
			d3.selectAll("#trashDiv").on("click", function(){
				$(this).parent().remove();
			});
			var preIflag = true;
			d3.selectAll(".selectPOI").on("click", function(){
				let pre_I = $(this).prev()
				$(this).next().slideToggle(300, function(){
					if(preIflag){
						pre_I.removeClass("fa-angle-down").addClass("fa-angle-up");
						preIflag = false;
					}else{
						pre_I.removeClass("fa-angle-up").addClass("fa-angle-down");
						preIflag = true;
					}
				});
				
			});
			d3.selectAll(".selectDiv p").on("click", function(){
				let value_inner = $(this).html();
				let input_val = $(this).parent().prev();
				let img = $(this).parent().next();
				if(value_inner == 'Gas station'){
					img.attr("src","img/gasstation3.png").css({"display": 'block', "left": "16px"});
				}else if(value_inner == 'Supermarket'){
					img.attr("src","img/supermarket3.png").css("display", 'block');
				}else if(value_inner == 'Bank'){
					img.attr("src","img/bank3.png").css({"display": 'block', "top": "16px", "left": "18px", "width": "18px", "height": "19px"});
				}
				
				input_val.val(value_inner);
				$(this).parent().slideUp(300);
				if(preIflag){
						input_val.prev().removeClass("fa-angle-down").addClass("fa-angle-up");
						preIflag = false;
					}else{
						input_val.prev().removeClass("fa-angle-up").addClass("fa-angle-down");
						preIflag = true;
					}
			})
		}
		
		d3.selectAll(".tabsClass li").on("click", function(){
			for(let qq = 0; qq<3; qq++){
				if (qq == $(this).index()){
					$(this).addClass('addtabsClass1').removeClass('addtabsClass2');
				}else{
					$(".tabsClass li").eq(qq).addClass('addtabsClass2').removeClass('addtabsClass1');
				}
			}
		})
		
		//行程数据
		var data_traj = [{'traj': {'time': [0, 33]}}, {'traj': {'time': [56, 64]}}, {'traj': {'time': [72, 84]}}, {'traj': {'time': [105, 131]}}, {'traj': {'road': [17, 184, 184, 447, 237, 578, 241, 241, 0], 'time': [133, 142]}}, {'traj': {'road': [167, 295, 90, 84, 83, 74, 74, 67, 67, 67, 67, 130, 130, 126], 'time': [176, 190]}}, {'traj': {'road': [128, 125, 202, 311, 310, 308, 487, 487, 487, 489, 489, 363, 363, 417], 'time': [191, 205]}}, {'traj': {'road': [179, 179, 179, 181, 179, 181, 179, 181, 181, 181, 179, 179, 181, 179, 179, 179], 'time': [299, 315]}}, {'traj': {'road': [178], 'time': [326, 327]}}, {'traj': {'road': [515, 515, 515, 515, 515, 352, 352, 352, 354, 354, 354, 354, 354, 269, 269, 306, 306, 306, 0, 306, 304, 304, 113, 113, 113, 113, 113, 112, 112, 112, 54, 53, 53, 300, 0, 0], 'time': [346, 382]}}, {'traj': {'road': [297, 475, 475, 475, 475, 111, 111, 55, 55, 1, 1, 1, 1, 3, 3, 3, 5, 5, 6, 6, 72, 79], 'time': [396, 418]}}, {'traj': {'road': [0, 77, 76, 76, 83, 83, 84, 90, 92, 182, 182, 108, 447, 448, 448, 448, 244, 242, 247, 252, 609, 393, 608, 392, 390, 390, 398, 398], 'time': [424, 452]}}, {'traj': {'road': [402, 402, 398, 398, 397, 387, 385, 384, 384, 377, 377, 363, 491, 491, 489, 489, 489, 488, 488, 488, 488, 488], 'time': [458, 480]}}, {'traj': {'road': [414, 414, 414, 491, 491, 489, 489, 489, 489, 489, 487, 487, 487, 308, 308, 309, 311, 213, 201, 201, 198, 198, 123, 123, 123, 115, 115, 115], 'time': [496, 524]}}, {'traj': {'road': [130, 130, 67, 67, 67, 74, 74, 74, 74, 74, 83, 83, 84, 84, 85, 85], 'time': [534, 550]}}, {'traj': {'road': [455, 455, 225, 228, 228, 228, 229, 585, 585, 585, 585, 585, 583, 583, 583, 326, 367, 0], 'time': [574, 592]}}, {'traj': {'road': [228, 228, 224, 453, 453, 454, 144, 139, 141, 141, 143, 143, 143, 85, 85, 0, 0, 0, 85, 143, 143, 294, 294, 295, 293, 293, 438, 439, 441, 441, 441, 441, 441], 'time': [602, 635]}}, {'traj': {'road': [92, 90, 90, 84, 84, 83, 83, 74, 74, 74, 74, 67, 67, 65, 65, 63, 62, 60, 60, 58, 58, 58, 57, 56, 56, 56, 56, 56, 56, 54, 53, 53, 51, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'time': [646, 693]}}, {'traj': {'road': [0, 0, 0, 0, 0, 0, 0, 0, 60, 63, 63, 65, 0, 0, 0, 0, 0, 0, 0, 0], 'time': [698, 718]}}, {'traj': {'road': [71, 71, 7, 81, 81, 81, 80, 0, 80, 80, 80, 78, 78, 78, 77, 76, 83, 83, 83, 84, 84, 84, 84, 143, 143, 143, 0, 294, 294, 293, 145, 145, 454, 226, 223, 321, 321, 321, 321, 321, 322, 322, 323, 324, 325, 325, 325, 365, 364, 364, 364, 368, 368, 0, 368, 368, 369, 369, 369, 370, 371, 336, 336, 342, 338, 338, 338, 339, 339, 460, 460, 462, 443, 442, 442, 171, 174, 174, 14, 13, 13, 0, 0, 0], 'time': [724, 808]}}, {'traj': {'road': [42, 42, 43, 39, 162, 162, 162, 162], 'time': [810, 818]}}, {'traj': {'road': [105, 106, 106, 106, 106, 106, 107, 169, 168, 168, 168, 168, 230, 229, 229, 0, 229], 'time': [831, 848]}}, {'traj': {'road': [228, 224, 453, 453, 453, 453, 457, 454, 454, 145, 145, 145, 293, 295, 295, 295, 295, 95, 96, 96, 96, 98, 98, 98, 98, 99, 99], 'time': [849, 876]}}, {'traj': {'road': [106, 106, 106, 106, 169, 169, 168, 168, 168, 170, 442, 442, 442, 462, 460, 460, 339, 338, 338, 336, 336], 'time': [883, 904]}}, {'traj': {'road': [336, 336, 346, 346, 599, 599, 599, 384, 498, 496, 496, 0, 437, 437, 437, 523, 523, 0], 'time': [905, 923]}}, {'traj': {'road': [368, 368, 368, 368, 376, 376, 376, 377, 377, 384, 384, 385, 385, 387, 389, 389, 397, 108, 447, 447, 237, 237, 237, 236, 238, 241, 241, 241, 247, 252, 609, 609], 'time': [969, 1001]}}, {'traj': {'road': [608, 608, 380, 380, 380, 380, 607, 386, 610, 610, 610, 610, 0, 0, 0, 0, 496, 496, 497, 497, 497, 497, 494, 433, 433, 433, 433, 433, 433, 433, 433, 433, 433, 432, 432, 432], 'time': [1002, 1038]}}, {'traj': {'road': [425, 426, 414, 414, 414, 414, 414, 492, 492, 492, 324, 328, 328, 328, 328, 334, 334, 334, 334, 334, 337, 337, 337, 338, 338, 339, 442, 442, 176, 173, 174, 174, 174, 13, 167, 167, 167, 170, 170, 176, 176, 176, 171, 170, 167, 167, 167, 92, 93, 91, 91, 67, 0, 66, 65, 65, 652, 652], 'time': [1040, 1098]}}, {'traj': {'road': [66, 66, 66, 67, 67, 67, 203, 74, 74, 83, 83, 84, 85, 85], 'time': [1103, 1117]}}, {'traj': {'road': [139, 139, 455, 455, 321, 321, 321, 321, 321, 488, 488, 488, 488, 488, 486, 484, 484, 484, 484, 413, 413, 413, 0, 420, 420, 419, 419, 419, 675, 675, 419, 418], 'time': [1122, 1154]}}, {'traj': {'road': [353, 0, 353, 0, 353, 0, 0, 0, 594, 534, 534, 661, 538, 538, 0, 0, 0, 0, 0, 0, 0, 0], 'time': [1162, 1184]}}, {'traj': {'road': [363, 363, 368, 368, 376, 376, 376, 377, 377, 384, 384, 385, 386, 607, 608, 382, 382], 'time': [1326, 1343]}}, {'traj': {'road': [380, 608, 609, 253, 252, 241, 238, 238, 236, 236, 235, 232], 'time': [1351, 1363]}}, {'traj': {'road': [167], 'time': [1379, 1380]}}, {'traj': {'time': [1381, 1393]}}]
		var data_traj1 = {'traj': [{'time': [0, 33]}, {'time': [56, 64]}, {'time': [72, 84]}, {'time': [105, 131]}, {'time': [133, 142]}, {'time': [176, 190]}, {'time': [191, 205]}, {'time': [299, 315]}, {'time': [326, 327]}, {'time': [346, 382]}, {'time': [396, 418]}, {'time': [424, 452]}, {'time': [458, 480]}, {'time': [496, 524]}, {'time': [534, 550]}, {'time': [574, 592]}, {'time': [602, 635]}, {'time': [646, 693]}, {'time': [698, 718]}, {'time': [724, 808]}, {'time': [810, 818]}, {'time': [831, 848]}, {'time': [849, 876]}, {'time': [883, 904]}, {'time': [905, 923]}, {'time': [969, 1001]}, {'time': [1002, 1038]}, {'time': [1040, 1098]}, {'time': [1103, 1117]}, {'time': [1122, 1154]}, {'time': [1162, 1184]}, {'time': [1326, 1343]}, {'time': [1351, 1363]}, {'time': [1379, 1380]}, {'time': [1381, 1393]}], 'trip':{'catagory': [[1, 4, 5, 7, 8, 14, 15, 20, 21, 22, 23, 28, 32, 33, 34], [2, 3, 6, 10, 12, 13, 16, 18, 24, 26, 29, 30, 31], [0, 9, 11, 17, 19, 25, 27]], 'Number':[15, 13, 7], 'Fee':[11, 17, 35]}}
		var data_traj2 = {'traj': [{'latlng': [[28.02618027, 120.59850311], [28.02605057, 120.5976181], [28.02598, 120.59757233], [28.02384949, 120.5965271], [28.02281952, 120.59628296], [28.02193069, 120.59716797], [28.02082062, 120.60025024], [28.0190506, 120.60292816], [28.01707077, 120.6032486], [28.01474953, 120.60227966], [28.01457024, 120.60217285], [28.01429939, 120.60209656], [28.01555061, 120.60263062], [28.01715088, 120.60334778], [28.01882935, 120.6037674], [28.02042961, 120.60151672], [28.02135086, 120.59944916], [28.02210045, 120.59736633], [28.02242088, 120.59625244], [28.02227974, 120.59570313], [28.02079964, 120.59539795], [28.01861954, 120.59474945], [28.01586914, 120.59384918], [28.01384926, 120.59349823], [28.01262093, 120.597229], [28.01124954, 120.59757233], [28.01037979, 120.59741974], [28.00975037, 120.59707642]], 'time': [0, 20]}, {'latlng': [[28.02412987, 120.59082031], [28.02367973, 120.59203339], [28.02248001, 120.59525299], [28.02219963, 120.5952301], [28.02129936, 120.59552002], [28.02045059, 120.59519958]], 'time': [399, 404]}, {'latlng': [[28.02099991, 120.59545135], [28.01992989, 120.59526825], [28.02227974, 120.59615326], [28.02141953, 120.59857178], [28.02029991, 120.60124969], [28.01914978, 120.60285187], [28.01843071, 120.60386658], [28.01650047, 120.60666656], [28.01622009, 120.60710144], [28.01415062, 120.6100235], [28.01268005, 120.61443329], [28.01180077, 120.61820221], [28.01174927, 120.61847687], [28.01147079, 120.61985016], [28.01016998, 120.62458038], [28.00942039, 120.62640381], [28.00835037, 120.63111877], [28.00675011, 120.63514709], [28.00676918, 120.63568115], [28.00735092, 120.63677216]], 'time': [444, 456]}, {'latlng': [[28.01922035, 120.61562347], [28.0196209, 120.61184692], [28.02008057, 120.60778046], [28.02033043, 120.60521698], [28.02045059, 120.60199738], [28.02109909, 120.60002899]], 'time': [466, 471]}, {'latlng': [[28.0103302, 120.63169861], [28.0103302, 120.63256836], [28.01037979, 120.63369751], [28.00972939, 120.63687134], [28.00860023, 120.63691711], [28.00868034, 120.6386795], [28.01085091, 120.64243317], [28.01102066, 120.64309692], [28.01169968, 120.64649963], [28.01073074, 120.64987946], [28.01112938, 120.65139771], [28.01186943, 120.65357971], [28.01272011, 120.65564728], [28.01384926, 120.65931702], [28.01156998, 120.66072083], [28.01040077, 120.66262817], [28.01085091, 120.6651001], [28.01046944, 120.66742706]], 'time': [502, 514]}, {'latlng': [[28.01453018, 120.66532135], [28.01536942, 120.66536713], [28.0155201, 120.66477203], [28.01462936, 120.66152954], [28.01392937, 120.65953064], [28.01370049, 120.65899658], [28.01262093, 120.65583038], [28.01213074, 120.65453339], [28.01157951, 120.65263367], [28.01247025, 120.64977264]], 'time': [525, 531]}, {'latlng': [[27.98533058, 120.68087006], [27.98550034, 120.68148041], [27.98749924, 120.68112183], [27.98903084, 120.68106842], [27.9918499, 120.68112946], [27.9944191, 120.68112946], [27.99555016, 120.68097687], [27.99798012, 120.6805191], [28.00185013, 120.67970276], [28.00296974, 120.67925262], [28.00295067, 120.67592621], [28.00292969, 120.6754303]], 'time': [588, 595]}, {'latlng': [[28.01128006, 120.6427002], [28.01122093, 120.64272308], [28.01098061, 120.64299774], [28.01148033, 120.64566803], [28.01157951, 120.6462326], [28.0114994, 120.64797974], [28.01086998, 120.65090179], [28.01135063, 120.65206909], [28.01148033, 120.65245056], [28.01199913, 120.65383148], [28.01259995, 120.65551758], [28.01317978, 120.65712738], [28.0136795, 120.65843201], [28.01420021, 120.66031647], [28.01479912, 120.66220093], [28.01527977, 120.66425323], [28.01745033, 120.66452026], [28.01925087, 120.6629715], [28.01997948, 120.66210175], [28.02141953, 120.66104889], [28.02352905, 120.65947723]], 'time': [614, 627]}, {'latlng': [[27.99213028, 120.62328339], [27.99291992, 120.62574768], [27.99296951, 120.62615204], [27.99332047, 120.62684631], [27.99404907, 120.62818146], [27.99485016, 120.62995148], [27.99477005, 120.62996674], [27.99567986, 120.63121796], [27.99651909, 120.63324738], [27.99768066, 120.63623047], [27.99793053, 120.63684845], [27.99925041, 120.63748169], [28.00060081, 120.63748169], [28.00115013, 120.63742065], [28.00342941, 120.63625336], [28.00455093, 120.63542175], [28.00507927, 120.6350174], [28.00592995, 120.63459778], [28.00665092, 120.63538361], [28.00816917, 120.6324234], [28.00900078, 120.62851715], [28.00958061, 120.6264267], [28.01049995, 120.62418365], [28.01085091, 120.62280273], [28.01144981, 120.62059784], [28.01174927, 120.61946869], [28.01222038, 120.61740112], [28.01267052, 120.61572266], [28.0136795, 120.61139679], [28.01555061, 120.60842133], [28.0170002, 120.60621643], [28.0183506, 120.60427094], [28.01888084, 120.60356903], [28.02065086, 120.60088348], [28.02152061, 120.59902191], [28.02153015, 120.59896851], [28.02172089, 120.59803009], [28.02190018, 120.59767151], [28.02215004, 120.59702301], [28.02218056, 120.59693146], [28.02243042, 120.59612274], [28.02058029, 120.59535217], [28.01767921, 120.5944519], [28.01567078, 120.5938797], [28.01452065, 120.59362793], [28.0130806, 120.59573364], [28.01222992, 120.59854889], [28.01099968, 120.60079956], [28.01021957, 120.60040283], [28.00931931, 120.59909821], [28.00956917, 120.59748077], [28.00958061, 120.59722137], [28.01045036, 120.59739685], [28.01169968, 120.5976181], [28.0130291, 120.59792328], [28.01404953, 120.59902191], [28.0142498, 120.6011734], [28.01391983, 120.60218048], [28.01387978, 120.60366821], [28.01412964, 120.60597229], [28.01417923, 120.60701752], [28.0156002, 120.60791779], [28.01461983, 120.60932159], [28.01326942, 120.61177826], [28.01250076, 120.61495209], [28.01112938, 120.61534882], [28.00919914, 120.61618042], [28.00777054, 120.61727142], [28.00659943, 120.61695099], [28.00421906, 120.61502838], [28.0027504, 120.61274719], [28.00161934, 120.61070251], [28.0011692, 120.60852051], [28.00102997, 120.60825348], [27.99931908, 120.60292816], [27.99937057, 120.60089874], [27.99831963, 120.60102081]], 'time': [654, 700]}, {'latlng': [[27.98648071, 120.61018372], [27.98402977, 120.6101532], [27.98362923, 120.61047363], [27.98377037, 120.6133728], [27.98399925, 120.61502075], [27.98394966, 120.61711884], [27.98405075, 120.61972809], [27.98418045, 120.62272644], [27.98431969, 120.62615204], [27.98467064, 120.63047791], [27.98517036, 120.6318512], [27.98615074, 120.63516998], [27.98740005, 120.63887024], [27.98870087, 120.64176941], [27.98962021, 120.64372253], [27.99029922, 120.64527893], [27.9904995, 120.64566803], [27.99205017, 120.64904785], [27.98904991, 120.65180206], [27.98629951, 120.65408325], [27.98579979, 120.65751648], [27.98582077, 120.66326904], [27.98584938, 120.66472626], [27.9857502, 120.66732025], [27.9856205, 120.67102814], [27.9856205, 120.67282104], [27.98563004, 120.67337036], [27.98571968, 120.67404938], [27.98582077, 120.67510223], [27.98559952, 120.67658234], [27.98557091, 120.67693329], [27.98546982, 120.67852783], [27.98527908, 120.68060303], [27.98517036, 120.68229675], [27.98488045, 120.68434906], [27.98472023, 120.68512726], [27.98431969, 120.68890381], [27.98438072, 120.6936264], [27.9844799, 120.698349], [27.9844799, 120.69850159], [27.98450089, 120.70198059], [27.9845295, 120.70307922], [27.9843502, 120.70735168], [27.98394966, 120.71276855], [27.98390007, 120.71399689], [27.9836998, 120.71617126], [27.98323059, 120.7199707], [27.98310089, 120.72067261], [27.98167992, 120.72489929], [27.98077965, 120.72744751], [27.98049927, 120.7282486], [27.97833061, 120.73252869], [27.97687912, 120.73561859], [27.97517014, 120.73957062], [27.97372055, 120.74289703], [27.97332954, 120.74382019]], 'time': [704, 746]}, {'latlng': [[27.98290062, 120.72200012], [27.98343086, 120.72035217], [27.98362923, 120.71922302], [27.9838295, 120.71630096], [27.98397064, 120.71499634], [27.98411942, 120.71337128], [27.98443031, 120.70916748], [27.98464966, 120.70497894], [27.98472023, 120.70413208], [27.98469925, 120.70082855], [27.98583031, 120.69879913], [27.98990059, 120.69827271], [27.9903698, 120.69438171], [27.99037933, 120.69172668], [27.99023056, 120.68788147], [27.99041939, 120.68115234], [27.99303055, 120.68112183], [27.99526978, 120.68102264], [27.99782944, 120.68039703]], 'time': [752, 765]}, {'latlng': [[27.99692917, 120.67437744], [27.99662018, 120.67196655], [27.99696922, 120.67176819], [27.99670029, 120.67169952], [27.99391937, 120.6723175], [27.99366951, 120.67070007], [27.99360085, 120.6669693], [27.99398041, 120.66284943], [27.9946003, 120.66027832], [27.99497986, 120.65756989], [27.99510002, 120.65477753], [27.99353027, 120.65135193], [27.99250031, 120.64929962], [27.99136925, 120.64703369], [27.99057007, 120.64556885], [27.98942947, 120.64227295], [27.99132919, 120.64150238], [27.99098015, 120.63880157], [27.99334908, 120.63746643], [27.99682999, 120.63707733], [27.99780083, 120.63722992], [27.9972496, 120.63471985], [27.99578094, 120.63108063], [27.99508095, 120.62976837]], 'time': [767, 781]}, {'latlng': [[27.99017906, 120.62342834], [27.99214935, 120.62317657], [27.9926796, 120.62036896], [27.99201965, 120.61534882], [27.99157906, 120.61308289], [27.99217987, 120.61032867], [27.99393082, 120.61035156], [27.99628067, 120.61118317], [28.00580025, 120.61657715], [28.00727081, 120.61734772], [28.00787926, 120.6175766], [28.01062012, 120.61852264], [28.01140022, 120.61875153], [28.01169968, 120.61885071], [28.01576996, 120.62013245], [28.02083015, 120.62068176], [28.02462959, 120.62104797], [28.02828026, 120.62172699], [28.0291996, 120.62197876], [28.02981949, 120.62291718], [28.02942085, 120.62181854]], 'time': [785, 802]}, {'latlng': [[28.02318001, 120.61981964], [28.02342033, 120.62326813], [28.02358055, 120.62802887], [28.02351952, 120.62931824], [28.02363014, 120.63057709], [28.02346992, 120.63124847], [28.02350044, 120.63272858], [28.0239296, 120.63439941], [28.02392006, 120.63514709], [28.02364922, 120.63893127], [28.02355003, 120.64510345], [28.02334976, 120.65447235], [28.02338028, 120.65440369], [28.01972961, 120.65232849], [28.01897049, 120.65258026], [28.01865005, 120.65267944], [28.01787949, 120.65274811], [28.01742935, 120.65305328], [28.01619911, 120.65315247], [28.01347923, 120.65392303], [28.01272964, 120.65522766], [28.0128994, 120.65551758], [28.01227951, 120.65730286], [28.01012993, 120.65831757]], 'time': [807, 840]}, {'latlng': [[28.01135063, 120.66101837], [28.01217079, 120.66020203], [28.01247978, 120.65991974], [28.01309967, 120.65952301], [28.01460075, 120.66136932], [28.01519966, 120.66352081], [28.01561928, 120.66497803], [28.01646996, 120.66516876], [28.0178299, 120.66394806], [28.0188694, 120.66313171], [28.02020073, 120.66313171], [28.02199936, 120.66316986], [28.02339935, 120.66290283], [28.02347946, 120.66287994], [28.02383041, 120.66155243], [28.02491951, 120.65886688], [28.02759933, 120.6574173], [28.02865028, 120.65901947], [28.02873039, 120.65821838], [28.0286808, 120.65808105], [28.02824974, 120.65657043], [28.02676964, 120.65827942], [28.02467918, 120.65892792], [28.0243206, 120.65910339], [28.02407074, 120.65920258], [28.02338028, 120.65947723], [28.02281952, 120.65992737], [28.02199936, 120.6603775], [28.02162933, 120.66087341], [28.02029991, 120.66197205], [28.02001953, 120.66203308], [28.0197506, 120.66300201], [28.0203495, 120.66307831], [28.02120018, 120.66383362], [28.02038002, 120.66587067], [28.02067947, 120.66726685], [28.02272034, 120.66902924], [28.02022934, 120.6787796], [28.01936913, 120.68450165], [28.01843071, 120.69180298], [28.01787949, 120.69777679], [28.00927925, 120.69625092], [28.00852013, 120.69616699], [28.00807953, 120.70002747], [28.00827026, 120.7004776], [28.00811958, 120.70397186], [28.00836945, 120.71012878], [28.00856972, 120.71285248], [28.00629997, 120.71247101], [28.00601959, 120.71247864], [28.00329971, 120.71166992], [28.00304985, 120.71115112], [28.00102997, 120.70717621], [28.00091934, 120.70570374]], 'time': [843, 890]}, {'latlng': [[28.00172043, 120.70185089], [28.00209999, 120.69947052], [28.00242996, 120.69674683], [28.00252914, 120.69526672], [28.00283051, 120.69297791], [28.00270081, 120.68888092], [28.00385094, 120.68823242], [28.00613022, 120.68782806], [28.00849915, 120.68437958], [28.00867081, 120.68247986], [28.00897026, 120.67903137], [28.00901985, 120.67861938], [28.00914955, 120.67822266], [28.00847054, 120.67607117], [28.00962067, 120.67169952], [28.00976944, 120.67105103], [28.01098061, 120.66552734], [28.01272011, 120.6652298], [28.0120697, 120.66512299], [28.01123047, 120.66303253], [28.01066971, 120.66322327], [28.01012993, 120.66307068]], 'time': [893, 907]}, {'latlng': [[28.00760078, 120.66902161], [28.00556946, 120.66886902], [28.00577927, 120.66783142], [28.00617981, 120.66605377], [28.00617981, 120.66581726], [28.00532913, 120.66390228], [28.00317001, 120.6623764], [27.99571991, 120.657547], [27.99530029, 120.65712738], [27.99144936, 120.65561676], [27.99106979, 120.65550232]], 'time': [913, 920]}, {'latlng': [[27.99267006, 120.65589905], [27.99493027, 120.65720367], [27.99444962, 120.66062927], [27.99397087, 120.66266632], [27.99357033, 120.6652298], [27.99354935, 120.66832733], [27.99399948, 120.67524719], [27.99415016, 120.67632294], [27.99440002, 120.6785202], [27.99477959, 120.68084717], [27.99488068, 120.68184662], [27.99382019, 120.68717957], [27.99296951, 120.68982697], [27.99349976, 120.69026947], [27.9978199, 120.68993378], [28.0012207, 120.68924713], [28.00292015, 120.68888092], [28.00342941, 120.68878174], [28.00407982, 120.68858337]], 'time': [923, 935]}, {'latlng': [[28.01663017, 120.64801788], [28.01457024, 120.6488266], [28.01353073, 120.64936829], [28.01296997, 120.64958191], [28.01143074, 120.64472198], [28.01025009, 120.64150238], [28.00967026, 120.64037323], [28.00753021, 120.63787079], [28.00761986, 120.63713074], [28.00696945, 120.63591766], [28.00634956, 120.63491821], [28.00466919, 120.63535309], [28.00227928, 120.63693237], [28.00107002, 120.63739777], [27.9981308, 120.63677979], [27.9964695, 120.63279724], [27.99588013, 120.63141632], [27.99510002, 120.62979889], [27.99328041, 120.62741852], [27.99250031, 120.62419891], [27.99233055, 120.6231308], [27.99053001, 120.62335205], [27.98965073, 120.62349701], [27.99212074, 120.6231308], [27.99217987, 120.62322235], [27.99187088, 120.62304688]], 'time': [960, 976]}, {'latlng': [[28.0123806, 120.59792328], [28.01333046, 120.59526825], [28.01527023, 120.59377289], [28.01683044, 120.59413147], [28.01798058, 120.59449768], [28.01925087, 120.59494781], [28.0210495, 120.59558105], [28.02232933, 120.59607697], [28.02194977, 120.59718323]], 'time': [1023, 1033]}, {'latlng': [[27.97977066, 120.53807068], [27.97789955, 120.54096985], [27.97617912, 120.54406738], [27.97439957, 120.54720306], [27.97397041, 120.55124664], [27.97517967, 120.55625153], [27.97643089, 120.56143188], [27.97730064, 120.56494904], [27.97727966, 120.5666275], [27.97707939, 120.56815338], [27.97662926, 120.57176971], [27.97540092, 120.57613373], [27.97455025, 120.57911682], [27.97291946, 120.58483124], [27.97108078, 120.59055328], [27.96890068, 120.59651947], [27.96718025, 120.60262299], [27.96751976, 120.60894775], [27.9679203, 120.6149826], [27.96825027, 120.62042999], [27.96862984, 120.62608337], [27.96867943, 120.6318512], [27.9675808, 120.63793182], [27.9654007, 120.64320374], [27.96442032, 120.64917755], [27.9640007, 120.65442657], [27.96376991, 120.65989685], [27.96501923, 120.66571808], [27.96730042, 120.67027283], [27.96902084, 120.67462158], [27.96993065, 120.67845154], [27.97036934, 120.68018341], [27.97043037, 120.68067169], [27.97290039, 120.6799469], [27.9756794, 120.67900085], [27.97792053, 120.67803192], [27.97940063, 120.67735291], [27.97982979, 120.67714691], [27.98085022, 120.67666626], [27.98122025, 120.67649841], [27.9822197, 120.67592621], [27.98298073, 120.67555237], [27.98419952, 120.67503357], [27.98481941, 120.67475128], [27.98665047, 120.6740799], [27.98888016, 120.67359924], [27.98900032, 120.67362213], [27.98991966, 120.6734314], [27.9910202, 120.67366791], [27.9912796, 120.67507172], [27.99157906, 120.67652893], [27.99172974, 120.67768097], [27.99221992, 120.68006897], [27.99066925, 120.68105316], [27.99054909, 120.68103027], [27.98825073, 120.68103027], [27.98674965, 120.68106842], [27.98559952, 120.6805191], [27.98567009, 120.67842102], [27.98572922, 120.67787933], [27.98579979, 120.67707825]], 'time': [1068, 1128]}, {'latlng': [[27.96145058, 120.59552765], [27.96122932, 120.59584808], [27.9607296, 120.59674835], [27.96035004, 120.59736633], [27.96068001, 120.59697723], [27.96044922, 120.59722137], [27.9593792, 120.59905243]], 'time': [1169, 1173]}, {'latlng': [[27.96282005, 120.66383362], [27.96386909, 120.66329956], [27.96385002, 120.66248322]], 'time': [1188, 1207]}, {'latlng': [[27.97105026, 120.5830307], [27.97287941, 120.5840683], [27.97241974, 120.58550262], [27.97162056, 120.58889771], [27.9702301, 120.59265137], [27.96858025, 120.5969696], [27.96713066, 120.60233307], [27.96735001, 120.6072998], [27.96775055, 120.61318207], [27.9681797, 120.61969757], [27.96858025, 120.62550354], [27.96870041, 120.63155365], [27.96756935, 120.63793182], [27.96504974, 120.64351654], [27.96430016, 120.64833069], [27.96430016, 120.64852905], [27.96422958, 120.64990234], [27.96380043, 120.65383148], [27.96113014, 120.65574646]], 'time': [1296, 1306]}, {'latlng': [[27.95657921, 120.65184784], [27.95697021, 120.65157318], [27.95742035, 120.65122986], [27.95927048, 120.64977264], [27.9619503, 120.64907074], [27.96389961, 120.64897156], [27.9647007, 120.64772034], [27.96528053, 120.64402008], [27.96713066, 120.64031982], [27.96820068, 120.63514709], [27.96891975, 120.63034821], [27.9686203, 120.62439728], [27.96820068, 120.61791992], [27.96777916, 120.61157227], [27.96736908, 120.60513306], [27.96814919, 120.59887695], [27.97031975, 120.59300232], [27.97220039, 120.5876236], [27.97402954, 120.58367157], [27.97167015, 120.5830307], [27.96866989, 120.58203125], [27.96680069, 120.58190155], [27.96725082, 120.58203125], [27.96717072, 120.58167267], [27.96554947, 120.58242035], [27.96567917, 120.58239746], [27.96607018, 120.58209991]], 'time': [1321, 1369]}, {'latlng': [[28.02028084, 120.66712952], [28.0189991, 120.66964722], [28.0182991, 120.67241669], [28.01701927, 120.67423248], [28.01497078, 120.67372894], [28.01435089, 120.6760788], [28.0141201, 120.67957306], [28.01350021, 120.6828537]], 'time': [1403, 1407]}, {'latlng': [[27.99645042, 120.67256927], [27.99894905, 120.67106628], [28.0019207, 120.66998291], [28.00247955, 120.66977692], [28.00276947, 120.6696701], [28.00281906, 120.66535187], [28.00378036, 120.66293335], [28.00387001, 120.66197205]], 'time': [1414, 1417]}], 'trip': {'Fee': [11, 15, 40], 'catagory': [[1, 3, 5, 6, 7, 16, 19, 21, 22, 25, 26], [0, 2, 4, 10, 11, 12, 13, 15, 17, 18], [8, 9, 14, 20, 23, 24]], 'everyfee': [[11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], [12, 15, 13, 16, 17, 14, 16, 14, 14, 14], [42, 50, 33, 64, 24, 25]], 'Number': [11, 10, 6]}}
		//*****************需要写个接口*****************************//
		function drawTrajrect(data, data1, data11, data2){
			var usedata1 = [], usedata2 = []
			for (var j = 0; j< data1[0].length; j++){
				usedata1.push([
					j+0.5,
					data1[0][j]
				]);
				usedata2.push([
					j+0.5,
					data1[1][j]
				]);
			}
			let compute1 = d3.interpolate('#60CDBE', '#FDFFBF');  // 绿0  空载率最大        黄1 空载率中等
			let compute2 = d3.interpolate('#AA1B27', '#FDFFBF');   //红0  空载率最小        黄1 空载率中等
			let linear1 = d3.scaleLinear()  
				           .domain([0,50])  
				           .range([0,1]);
			let linear2 = d3.scaleLinear()  
				           .domain([50,100])  
				           .range([1,0]);
			var Triangledata1 = [[0, 0], [18, 0], [9, 9]],  Triangledata2 = [[16, 73], [34, 73], [25, 64]]
			var svg3 = d3.select("#view1").append("svg")
										  .attr("width", 318.5)
										  .attr("height", 88)
										  .attr("class", "svg3")
			var scale = d3.scaleLinear()
			              .domain([0, 1440])
			              .range([25, 293.5]);
			var trajrect = svg3.selectAll("rect")
							   .data(data.traj)
							   .enter()
							   .append("rect")
							   .attr("fill", function(d,i){
							   	    let ccoo; 
								   	for(var j = 0; j<data.trip.catagory.length; j++){
								   		if(data.trip.catagory[j].includes(i)){
								   			if(j==0){
								   				ccoo = "#DFEED5"	
								   			}else if(j==1){
								   				ccoo = "#FEC7E4"
								   			}else if(j==2){
								   				ccoo = "#EB937F"
								   			}
								   		return ccoo
								   		}
								   	}
//							   		return "#2F2F2F"  eb937f   e0eed4  fec8e2
							   })
							   .attr("x", function(d,j){
								   return scale(d.time[0]) 
								})
							   .attr("y", 19)
							   .attr("height", 45)
							   .attr("width", function(d, i){
							  	   return scale(d.time[1])-scale(d.time[0])
							    })
							    .attr("class", "rect3");
//			drawPoly(svg3, Triangledata1, "red", "p2"); 
			drawPoly(svg3, Triangledata2, "#8C7AA5", "p1");
			
			var vLine1 = svg3.append("line")
                             .attr("class", "focusLine1")
                             .attr("stroke","red")
                             .attr("stroke-dasharray",4)//设置虚线
                             .style("display", "none");
			var TimeText1 = svg3.append("text")
								.attr("class", "TimeText")
							    .attr("fill", "#5E6268")
							    .attr("x", 7)
							    .attr("y", 13)
							    .text("00:00")
			
			var TimeText2 = svg3.append("text")
								.attr("class", "TimeText")
							    .attr("fill", "#5E6268")
							    .attr("x", 265)
							    .attr("y", 13)
							    .text("00:00")
			var coordinate, timevalue, triptype, tripfee;
			var rect3contain = d3.selectAll(".rect3")
			
			d3.select(".p1").call(d3.drag().on("drag", function(){
						
						let c1 = d3.selectAll(".svg41circle1")._groups[0], c2 = d3.selectAll(".svg41circle2")._groups[0]
						let ntime
						d3.select(".p1").attr("transform", function(){
							if(d3.event.x < 25){
								coordinate = 0;
							}else if(d3.event.x > 293.5){
								coordinate = 268.5;
							}else{
								coordinate = d3.event.x-25;
							}
//							console.log(coordinate)
							return "translate("+coordinate+",0)"
						})
						vLine1.attr("x1", coordinate+25)
		            	      .attr("y1", 19)
		            	      .attr("x2", coordinate+25)
		            	      .attr("y2", 59);
		            	vLine1.style("display", null);
		            	for(var j = 0; j<data.traj.length; j++){
		            		let rect3X = parseFloat(rect3contain._groups[0][j].attributes[1].value),
		            			rect3X1 = rect3X + parseFloat(rect3contain._groups[0][j].attributes[4].value);
		            		let TimeHour, TimeMinute, TimeHour1, TimeMinute1, TimeString, TimeString1, selectedFlag = true, J_last;
		            		if((coordinate+25)>=rect3X && (coordinate+25)<=rect3X1){
		            			TimeHour = parseInt(data.traj[j].time[0]/60);
		            			TimeMinute = data.traj[j].time[0]%60;
		            			TimeHour1 = parseInt(data.traj[j].time[1]/60);
		            			TimeMinute1 = data.traj[j].time[1]%60;
		            			timevalue = data.traj[j].time[1]- data.traj[j].time[0]
		            			let ntime = TimeHour
		            			for(var k = 0; k<24; k++){
							   		if(k == ntime){
							   			d3.select(c1[k]).attr("opacity", 1);
							   			d3.select(c2[k]).attr("opacity", 1);
							   		}else{
							   			d3.select(c1[k]).attr("opacity", 0);
							   			d3.select(c2[k]).attr("opacity", 0);
							   		}
							   	}
		            			for(var k=0; k<data.trip.catagory.length; k++){
		            				if(data.trip.catagory[k].includes(j)){
		            					if(k==0){
		            						triptype = 'short';
		            					}else if(k==1){
		            						triptype = 'middle';
		            					}else if(k==2){
		            						triptype = 'long';
		            					}
		            					tripfee = data.trip.everyfee[k][data.trip.catagory[k].indexOf(j)]
		            					break
		            				}
		            			}
		            			if(TimeHour<10){
		            				TimeHour = "0"+TimeHour
		            			}
		            			if(TimeHour1<10){
		            				TimeHour1 = "0"+TimeHour1
		            			}
		            			if(TimeMinute<10){
		            				TimeMinute = "0"+TimeMinute
		            			}
		            			if(TimeMinute1<10){
		            				TimeMinute1 = "0"+TimeMinute1
		            			}
		            			TimeString = TimeHour+":"+TimeMinute
		            			TimeString1 = TimeHour1+":"+TimeMinute1
		            			TimeText1.text(TimeString); 
		            			TimeText2.text(TimeString1);
		            			d3.select(rect3contain._groups[0][j]).attr("stroke-width", "1").attr("stroke", "black")
		            			if(mode_flag == 0){
		            				d3.selectAll(".road").remove();
		            				d3.select(".trip1").remove();
			            			d3.selectAll(".haha").remove();
			            			d3.select(".leaflet-popup").remove();
			            			let newlatlng = []
			            			for(var bb = 0; bb<data.traj[j].latlng.length; bb++){
			            				newlatlng.push(latlngtran.wgs84togcj02(data.traj[j].latlng[bb]))
			            			}
			            			if(newlatlng.length>=2){
			            				L.marker(newlatlng[0], {icon: Icon1(startendurl[0])}).addTo(map).bindPopup('<p>Type:  '+ triptype +' <br />Fee:  '+tripfee+' rmb<br /> Time: '+timevalue+' min</p>') //.openPopup();
										L.marker(newlatlng[newlatlng.length-1], {icon: Icon1(startendurl[1])}).addTo(map).on("click", function(){
											d3.selectAll(".haha").remove();
											d3.select(".trip1").remove();
											d3.select(".leaflet-popup").remove();
										});
			            				var polyline = L.polyline(newlatlng, {color: 'red', className: 'trip1'}).addTo(map);
			            			}
			            			$("#tripinfo").css('display', "block")
							   		let a, b, c, d = 0;
							   		$("#show_road_icon").css('display', 'block')
							   		if(ntime>=0 && ntime != 24){ 
								   		for(var i = 0; i< 678; i++){
											if(data11[i+1][ntime]>50){
												color1 = compute1(linear2(data11[i+1][ntime]))
											}else{
												color1 = compute2(linear1(data11[i+1][ntime]))
											}
											d3.select(".road"+i).attr("stroke", color1)
										}
								   		if(ntime<9){
								   			c = "0"+ntime
								   		}else{
								   			c = ntime
								   		}
								   		for(var k = 0; k<data.traj.length; k++){
								   			if(data.traj[k].time[0]>=ntime*60 && data.traj[k].time[0]<(ntime+1)*60){
								   				d += 1;
								   			}
								   		}
								   		a = usedata2[ntime][1]
								   		b = usedata1[ntime][1]
								   		$(".trip_p1").html(""+c+" H");
								   		$(".trip_p2").html("trip num: "+d+"");
										$(".trip_p3").html("income : "+a+" rmb");
										$(".trip_p4").html("aveincome : "+b+" rmb");
							   		
										d3.selectAll(".circle0").remove()
								   		if(data2[ntime].length>0){
								   			for(var q=0; q<data2[ntime].length; q++){
								   				console.log(data2[ntime][q]-1)
												L.circle(centerlist[data2[ntime][q]-1],{
											        	color: 'black',//颜色
											            fillColor: 'black',
											            fillOpacity: 0.8,//透明度
											            opacity: 1,
											            weight: 1,
											            radius: 0,//25,
											            className: 'circle0'
											        	}).addTo(map)
								   			}
							   			}
								   	}
		            			}
		            		}else{
		            			d3.select(".p1").style("fill", "#8C7AA5");
		            			d3.select(rect3contain._groups[0][j]).attr("stroke-width", "0")
		            		
		            		}
		            	}
					})
				   .on("end", function(){
				   		vLine1.style("display", "none");
				   		for(var i = 0; i<data.traj.length; i++){
				   			let rect3X = parseFloat(rect3contain._groups[0][i].attributes[1].value),
		            			rect3X1 = rect3X + parseFloat(rect3contain._groups[0][i].attributes[4].value);
		            		if((coordinate+25)>=rect3X && (coordinate+25)<=rect3X1){

		            			d3.select(".p1").style("fill", "#8C7AA5");
		            			break
		            		}else{
		            			d3.select(".p1").style("fill", "#8C7AA5");
		            		}
				   		}
				   		
			   }));
		}
		
		
		//*****************需要写个接口*****************************//
		function distanceStatistics(data){
			var wi4 = 318.5,he4 = 290, padding4 = {top:20, bottom:30, left:30, right:30};
			var svg4 = d3.select("#view2").append("svg")
										  .attr("width", wi4)
										  .attr("height", he4)
										  .attr("class", "svg4")
			var xax4 = wi4-padding4.left-padding4.right;
		    var yax4 = he4-padding4.top-padding4.bottom;
		    var lengthMaxN = d3.max(data.trip.Number)*1.2;
		    var lengthMaxF = d3.max(data.trip.Fee)*1.2;
		    var xSca4 = d3.scaleBand()
		                 .domain(["Short", "Middle", "Long"])
		                 .range([0,xax4]);
		    var ySca4N = d3.scaleLinear()
		                 .domain([0, lengthMaxN])
		                 .range([yax4,0]);
		    var ySca4F = d3.scaleLinear()
		                 .domain([0, lengthMaxF])
		                 .range([yax4,0]);
		    var colorOrdinalN = d3.scaleQuantize()
						  		  .domain([d3.min(data.trip.Number), d3.max(data.trip.Number)])
						  		  .range(["#7BDB91", "#1E9C48", "#074F24"])
			colorN = ["#324681", "#90b392", "#F04864"]
			colorF = ["#FFE7BA", "#fdf298", "#FA8C16"]
		    var xAxisL4 = d3.axisBottom(xSca4)
		              
			var yAxisL4 = d3.axisLeft(ySca4N)
			                .ticks(10)
			
			var yAxisL4F = d3.axisRight(ySca4F)
			                .ticks(10)
			
			var gX4 = svg4.append("g")
			            .attr("transform","translate("+padding4.left+","+(he4-padding4.bottom)+")")
			            .attr("class","gx4")
			            .call(xAxisL4)
			
			var gY4 = svg4.append("g")
			            .attr("transform","translate("+padding4.left+","+(he4-yax4-padding4.bottom)+")")
			            .attr("class", "gy4")
			            .call(yAxisL4);
			            
			var gY4F = svg4.append("g")
			            .attr("transform","translate("+(wi4-padding4.right)+","+(he4-yax4-padding4.bottom)+")")
			            .attr("class", "gy4F")
			            .call(yAxisL4F);
			            
			var rectStep = xSca4.step(), rectWidth = xSca4.step()/3-5;
			var rect4 = svg4.selectAll(".rect4")
						    .data(data.trip.Number)
						    .enter()
						    .append("rect")
						    .attr("fill", function(d, i){
						    	return colorN[1]
						    })
						    .attr("x", function(d,j){
						  		  return padding4.left-7+rectStep/4+j*rectStep+5
						    })
						    .attr("y", function(d, i){return he4-padding4.bottom-(ySca4N(0)-ySca4N(d))})
						    .attr("height", function(d,i){
						    	return ySca4N(0)-ySca4N(d)
						    })
						    .attr("width", rectWidth)
						    .attr("class", "rect4")
			var rect5 = svg4.selectAll(".rect5")
						    .data(data.trip.Fee)
						    .enter()
						    .append("rect")
						    .attr("fill", function(d, i){
						    	return colorF[1]
						    })
						    .attr("x", function(d,j){
						  		  return padding4.left-7+rectStep/4+j*rectStep+rectWidth+5
						    })
						    .attr("y", function(d, i){return he4-padding4.bottom-(ySca4F(0)-ySca4F(d))})
						    .attr("height", function(d,i){
						    	return ySca4F(0)-ySca4F(d)
						    })
						    .attr("width", rectWidth)
						    .attr("class", "rect4")
			var dataRect = ["#90b392", "#fdf298"]
			var rect6 = svg4.selectAll(".rect6")
							.data(dataRect)
							.enter()
							.append("rect")
							.attr("fill", (d,i)=>d)
							.attr("x", (d,i)=>padding4.left+30+i*105)
							.attr("y", 10)
							.attr("width", "15")
							.attr("height", "15")
							.attr("class", "rect6")
			var dataText = ["Trip number", "Average fee"]
			var text6 = svg4.selectAll(".text6")
							.data(dataText)
							.enter()
							.append("text")
							.attr("fill", "black")
							.attr("x", (d,i)=>padding4.left+50+i*105)
							.attr("y", 22)
							.style("font-weight", "600")
			                .style("font-family", "georgia")
			                .style("font-size", "11px")
							.attr("class", "text6")
							.text(function(d){
								return d
							})
			var text4 = svg4.selectAll(".text4")
			                .data(data.trip.Number)
			                .enter()
			                .append("text")
			                .attr("class",".text4")
			                .attr("fill","white")
			                .attr("text-anchor","middle")
			                .attr("x",(d,i)=>padding4.left-2+rectStep/4+i*rectStep)
			                .attr("y",(d,i)=>he4-padding4.bottom-(ySca4N(0)-ySca4N(d)))
			                .attr("dx",rectWidth/2)
			                .attr("dy","1em")
			                .style("font-weight", "600")
			                .style("font-family", "georgia")
			                .style("font-size", "12px")
			                .text(function(d){
			              	  return d;
			                });
			var text5 = svg4.selectAll(".text5")
			                .data(data.trip.Fee)
			                .enter()
			                .append("text")
			                .attr("class",".text5")
			                .attr("fill","white")
			                .attr("text-anchor","middle")
			                .attr("x",(d,i)=>padding4.left-2+rectStep/4+i*rectStep+rectWidth)
			                .attr("y",(d,i)=>he4-padding4.bottom-(ySca4F(0)-ySca4F(d)))
			                .attr("dx",rectWidth/2)
			                .attr("dy","1em")
			                .style("font-weight", "600")
			                .style("font-family", "georgia")
			                .style("font-size", "12px")
			                .text(function(d){
			              	  return d;
			                });
		}
		
		
		//*****************view2*****************************//
		
		
		var datasourse = [[14, 11, 10, 7, 3, 2, 6, 9, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 12, 11], [11, 0, 0, 0, 0, 0, 11, 12, 11, 0, 11, 35, 18, 12, 21, 11, 13, 11, 18, 11, 11, 23, 24, 11]]
		var noloaddata = {1: [42, 44, 44, 50, 59, 40, 32, 41, 38, 40, 42, 36, 34, 42, 30, 24, 35, 32, 40, 42, 41, 35, 38, 38], 2: [46, 47, 50, 47, 47, 41, 29, 54, 47, 46, 52, 43, 45, 51, 33, 31, 27, 41, 45, 43, 51, 41, 48, 52], 3: [57, 65, 61, 61, 67, 45, 32, 38, 39, 34, 39, 36, 35, 39, 33, 26, 36, 27, 42, 42, 43, 43, 44, 51], 4: [53, 59, 56, 63, 67, 39, 40, 40, 33, 33, 34, 33, 32, 35, 29, 26, 34, 28, 36, 38, 38, 41, 39, 46], 5: [38, 53, 55, 65, 72, 61, 39, 43, 51, 37, 36, 29, 29, 27, 28, 27, 30, 21, 31, 32, 31, 36, 33, 50], 6: [26, 35, 44, 55, 55, 63, 54, 47, 48, 39, 36, 28, 28, 29, 22, 17, 27, 19, 30, 32, 30, 30, 30, 40], 7: [18, 31, 48, 54, 56, 70, 47, 51, 53, 46, 36, 33, 31, 28, 18, 17, 23, 23, 29, 39, 31, 30, 35, 37], 8: [13, 27, 40, 52, 59, 68, 41, 50, 52, 49, 44, 28, 36, 23, 17, 20, 24, 20, 25, 40, 30, 27, 27, 35], 9: [12, 35, 54, 61, 68, 71, 44, 59, 56, 47, 45, 30, 33, 24, 16, 19, 23, 21, 37, 38, 39, 31, 39, 43], 10: [14, 49, 66, 69, 74, 76, 56, 52, 53, 45, 45, 36, 36, 30, 22, 21, 28, 24, 42, 47, 47, 42, 50, 61], 11: [17, 45, 68, 69, 70, 68, 43, 57, 54, 53, 55, 39, 40, 29, 24, 25, 30, 29, 41, 51, 51, 45, 56, 65], 12: [18, 37, 46, 57, 66, 71, 40, 56, 42, 42, 41, 33, 31, 23, 19, 22, 27, 22, 35, 37, 37, 33, 35, 49], 13: [22, 36, 46, 52, 59, 72, 40, 59, 41, 42, 41, 35, 33, 25, 17, 23, 26, 22, 31, 34, 37, 34, 34, 41], 14: [33, 38, 51, 60, 76, 73, 35, 53, 35, 34, 30, 28, 22, 16, 17, 19, 32, 26, 23, 26, 30, 30, 34, 42], 15: [30, 34, 44, 59, 75, 78, 39, 54, 36, 35, 28, 29, 25, 18, 18, 27, 34, 29, 24, 29, 23, 28, 31, 38], 16: [36, 35, 54, 68, 78, 80, 39, 56, 38, 35, 28, 25, 25, 21, 16, 32, 37, 31, 21, 26, 26, 28, 32, 40], 17: [31, 34, 40, 53, 69, 80, 52, 53, 34, 31, 23, 24, 27, 23, 15, 24, 34, 31, 20, 24, 18, 27, 28, 35], 18: [40, 34, 43, 63, 76, 79, 56, 63, 36, 37, 26, 26, 24, 24, 23, 18, 33, 33, 36, 32, 30, 42, 38, 36], 19: [80, 78, 74, 82, 90, 83, 86, 79, 63, 54, 54, 61, 62, 56, 63, 64, 64, 68, 80, 79, 78, 85, 84, 86], 20: [87, 75, 28, 40, 0, 100, 100, 100, 50, 100, 80, 50, 50, 50, 100, 50, 80, 70, 60, 75, 100, 90, 90, 100], 21: [83, 85, 83, 79, 96, 81, 82, 86, 60, 61, 60, 64, 62, 57, 66, 66, 68, 74, 86, 84, 80, 90, 87, 95], 22: [85, 90, 86, 87, 96, 87, 81, 87, 63, 60, 68, 63, 71, 58, 69, 68, 65, 77, 86, 84, 78, 92, 86, 96], 23: [90, 94, 81, 83, 97, 86, 86, 88, 61, 58, 66, 65, 73, 66, 67, 69, 70, 79, 86, 85, 79, 92, 87, 97], 24: [93, 94, 77, 92, 94, 81, 88, 87, 62, 76, 69, 69, 77, 77, 74, 67, 74, 76, 87, 85, 83, 93, 90, 94], 25: [97, 92, 81, 88, 90, 92, 94, 88, 74, 80, 73, 76, 83, 75, 79, 63, 71, 82, 90, 86, 89, 95, 94, 97], 26: [73, 55, 82, 70, 86, 70, 59, 65, 56, 52, 49, 50, 45, 50, 45, 41, 48, 51, 62, 73, 67, 70, 75, 80], 27: [86, 80, 82, 87, 80, 88, 92, 69, 72, 66, 66, 78, 72, 66, 73, 62, 66, 80, 88, 88, 89, 82, 91, 91], 28: [84, 94, 93, 68, 77, 85, 96, 100, 76, 56, 85, 61, 84, 57, 81, 75, 59, 71, 81, 86, 100, 88, 90, 84], 29: [86, 79, 86, 100, 62, 88, 95, 74, 76, 57, 65, 81, 83, 69, 70, 71, 60, 77, 90, 94, 87, 80, 92, 90], 30: [85, 86, 83, 85, 80, 50, 44, 40, 57, 27, 36, 52, 45, 28, 43, 40, 0, 30, 79, 83, 83, 80, 64, 70], 31: [0, 100, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 50, 0, 0, 66, 50, 0, 0, 100, 0], 32: [0, 100, 0, 0, 0, 0, 0, 50, 0, 100, 100, 0, 0, 60, 50, 100, 100, 33, 66, 50, 100, 0, 50, 50], 33: [42, 54, 65, 68, 75, 53, 44, 58, 62, 57, 36, 45, 33, 35, 24, 34, 27, 31, 38, 37, 37, 38, 47, 61], 34: [43, 60, 73, 80, 84, 78, 63, 65, 67, 55, 51, 50, 47, 41, 31, 26, 22, 29, 39, 55, 49, 48, 55, 66], 35: [28, 51, 68, 76, 87, 87, 70, 67, 72, 62, 57, 47, 50, 44, 27, 25, 27, 36, 42, 54, 48, 50, 55, 62], 36: [32, 55, 72, 82, 88, 80, 64, 57, 61, 48, 46, 42, 40, 33, 27, 24, 23, 24, 34, 52, 47, 44, 57, 68], 37: [26, 48, 67, 71, 78, 85, 77, 77, 78, 65, 59, 50, 46, 42, 30, 34, 31, 30, 42, 61, 53, 53, 63, 64], 38: [42, 70, 82, 91, 92, 100, 96, 93, 88, 86, 79, 72, 69, 50, 40, 44, 47, 43, 57, 83, 77, 60, 76, 62], 39: [10, 32, 48, 61, 50, 52, 20, 32, 30, 23, 27, 24, 23, 23, 21, 20, 21, 21, 35, 32, 32, 22, 36, 44], 40: [42, 63, 74, 78, 65, 92, 88, 88, 86, 79, 69, 57, 50, 63, 23, 33, 20, 44, 51, 65, 54, 42, 60, 68], 41: [19, 50, 62, 72, 65, 72, 66, 66, 53, 41, 38, 42, 35, 28, 17, 24, 30, 26, 47, 45, 45, 40, 51, 64], 42: [16, 35, 63, 76, 73, 46, 29, 62, 60, 47, 34, 29, 26, 36, 29, 24, 24, 28, 45, 34, 56, 36, 51, 63], 43: [27, 42, 53, 59, 43, 31, 24, 25, 19, 22, 22, 20, 24, 18, 14, 22, 20, 21, 25, 31, 35, 27, 39, 50], 44: [49, 49, 55, 58, 71, 58, 44, 58, 42, 40, 29, 31, 38, 20, 15, 35, 24, 28, 33, 27, 36, 32, 38, 62], 45: [30, 49, 47, 38, 44, 42, 25, 20, 19, 29, 31, 19, 16, 15, 13, 19, 26, 20, 32, 38, 19, 31, 35, 41], 46: [55, 59, 71, 53, 57, 66, 44, 48, 26, 35, 34, 25, 22, 21, 22, 27, 46, 32, 51, 40, 34, 38, 42, 56], 47: [27, 55, 33, 28, 30, 66, 34, 24, 20, 27, 32, 18, 17, 12, 15, 25, 24, 22, 37, 47, 29, 24, 36, 38], 48: [27, 36, 57, 44, 54, 66, 27, 14, 31, 9, 15, 10, 6, 15, 14, 24, 22, 37, 19, 12, 14, 30, 41, 37], 49: [28, 50, 21, 30, 55, 42, 25, 26, 23, 33, 23, 30, 21, 15, 19, 25, 21, 17, 43, 40, 41, 36, 36, 27], 50: [48, 69, 45, 47, 58, 50, 50, 46, 25, 38, 22, 36, 25, 32, 29, 19, 32, 31, 52, 50, 51, 57, 50, 51], 51: [51, 53, 57, 65, 77, 81, 72, 67, 54, 51, 41, 38, 47, 45, 43, 39, 35, 38, 51, 62, 62, 65, 59, 57], 52: [55, 52, 60, 60, 78, 75, 59, 60, 55, 57, 52, 46, 52, 47, 42, 33, 33, 35, 48, 55, 64, 54, 61, 62], 53: [57, 57, 62, 65, 74, 80, 60, 65, 60, 57, 45, 43, 48, 39, 43, 41, 37, 40, 55, 58, 62, 61, 62, 60], 54: [37, 39, 51, 57, 85, 77, 64, 62, 56, 59, 37, 43, 48, 39, 41, 37, 28, 44, 46, 57, 56, 44, 53, 41], 55: [41, 35, 37, 39, 66, 71, 62, 56, 57, 58, 43, 38, 37, 33, 31, 33, 43, 37, 38, 49, 42, 39, 33, 37], 56: [45, 50, 55, 60, 77, 84, 72, 65, 67, 57, 46, 45, 42, 38, 37, 34, 32, 35, 48, 44, 47, 49, 55, 46], 57: [73, 73, 87, 84, 93, 93, 80, 58, 67, 60, 52, 59, 59, 51, 57, 59, 50, 50, 63, 64, 74, 66, 73, 81], 58: [51, 58, 65, 72, 85, 84, 65, 65, 64, 58, 50, 45, 35, 31, 35, 34, 34, 31, 43, 44, 43, 43, 47, 47], 59: [41, 38, 38, 50, 70, 66, 36, 22, 42, 36, 28, 25, 23, 30, 24, 25, 28, 23, 33, 38, 25, 31, 24, 33], 60: [46, 55, 60, 62, 75, 74, 68, 61, 61, 49, 35, 34, 25, 31, 23, 29, 30, 26, 42, 40, 43, 39, 51, 46], 61: [57, 66, 79, 77, 82, 88, 79, 85, 84, 76, 65, 47, 54, 42, 32, 43, 29, 27, 40, 58, 54, 56, 64, 66], 62: [41, 44, 55, 72, 71, 74, 72, 70, 63, 51, 38, 37, 33, 33, 25, 34, 27, 26, 35, 45, 40, 42, 48, 42], 63: [46, 52, 58, 65, 76, 75, 64, 58, 65, 48, 34, 27, 26, 30, 17, 26, 28, 21, 30, 41, 38, 40, 52, 47], 64: [32, 37, 45, 52, 57, 62, 46, 43, 58, 40, 31, 30, 28, 16, 17, 22, 22, 19, 23, 30, 27, 28, 37, 43], 65: [45, 51, 56, 67, 72, 76, 61, 62, 63, 53, 38, 34, 28, 28, 24, 29, 27, 20, 32, 39, 36, 44, 47, 50], 66: [44, 47, 51, 58, 66, 67, 55, 62, 65, 54, 37, 35, 33, 27, 22, 26, 22, 19, 30, 39, 40, 42, 47, 50], 67: [40, 44, 51, 55, 60, 67, 55, 42, 42, 37, 30, 30, 27, 25, 17, 17, 18, 18, 24, 31, 32, 37, 42, 44], 68: [33, 49, 59, 65, 58, 67, 52, 42, 46, 49, 40, 31, 31, 23, 21, 18, 23, 19, 26, 42, 41, 40, 53, 59], 69: [32, 47, 65, 67, 71, 82, 66, 60, 66, 58, 56, 47, 46, 37, 27, 22, 28, 25, 30, 54, 46, 48, 58, 57], 70: [25, 42, 57, 62, 62, 73, 59, 52, 60, 56, 51, 43, 36, 40, 25, 23, 27, 23, 28, 47, 47, 43, 46, 54], 71: [25, 40, 55, 61, 67, 73, 60, 57, 65, 60, 53, 44, 39, 40, 22, 23, 30, 30, 36, 47, 45, 41, 48, 55], 72: [36, 48, 64, 79, 68, 91, 62, 71, 69, 62, 64, 52, 54, 46, 21, 25, 23, 25, 40, 58, 53, 51, 53, 64], 73: [36, 58, 80, 85, 71, 86, 72, 79, 77, 70, 66, 56, 55, 51, 27, 27, 26, 31, 49, 70, 68, 70, 73, 81], 74: [27, 33, 45, 55, 55, 63, 45, 36, 35, 32, 29, 25, 21, 21, 15, 13, 13, 12, 22, 31, 29, 35, 37, 41], 75: [29, 61, 82, 90, 87, 88, 73, 80, 78, 69, 74, 60, 53, 51, 44, 32, 22, 33, 50, 79, 78, 76, 81, 87], 76: [29, 57, 66, 70, 78, 82, 50, 60, 55, 49, 53, 44, 33, 29, 14, 12, 19, 18, 37, 60, 48, 46, 61, 60], 77: [38, 56, 83, 86, 93, 86, 73, 75, 72, 67, 64, 52, 47, 43, 29, 24, 22, 30, 37, 70, 63, 66, 75, 73], 78: [29, 51, 66, 65, 68, 80, 67, 68, 60, 55, 59, 45, 40, 29, 13, 13, 16, 17, 40, 62, 51, 49, 59, 55], 79: [31, 50, 65, 75, 69, 89, 72, 71, 71, 67, 70, 50, 49, 36, 25, 26, 22, 18, 43, 63, 55, 49, 59, 58], 80: [21, 35, 53, 56, 61, 74, 57, 64, 64, 49, 50, 42, 34, 26, 22, 21, 19, 19, 35, 50, 40, 40, 51, 49], 81: [25, 42, 56, 61, 61, 84, 65, 63, 66, 49, 50, 40, 37, 28, 25, 23, 20, 24, 34, 53, 39, 45, 54, 50], 82: [42, 66, 36, 25, 100, 100, 100, 88, 54, 77, 28, 75, 63, 0, 0, 0, 0, 50, 55, 72, 68, 76, 71, 70], 83: [26, 39, 50, 55, 60, 72, 46, 45, 44, 37, 40, 32, 30, 20, 19, 16, 13, 12, 25, 45, 34, 33, 43, 41], 84: [28, 48, 57, 62, 62, 70, 45, 50, 49, 39, 44, 35, 32, 22, 19, 22, 14, 15, 25, 50, 40, 35, 55, 50], 85: [32, 57, 66, 73, 67, 74, 68, 72, 59, 57, 57, 51, 42, 28, 19, 18, 16, 15, 32, 60, 55, 52, 69, 71], 86: [33, 41, 71, 77, 100, 100, 77, 57, 69, 48, 57, 63, 50, 28, 0, 45, 0, 16, 42, 74, 75, 64, 68, 51], 87: [21, 46, 65, 75, 72, 72, 66, 72, 74, 71, 71, 60, 49, 35, 13, 24, 21, 15, 31, 57, 52, 33, 52, 57], 88: [12, 33, 58, 60, 64, 75, 83, 53, 68, 64, 64, 39, 29, 27, 13, 18, 10, 4, 32, 53, 47, 24, 41, 43], 89: [18, 42, 56, 65, 76, 63, 62, 79, 72, 60, 62, 44, 37, 17, 20, 29, 12, 15, 29, 45, 40, 34, 41, 45], 90: [25, 48, 57, 69, 67, 73, 59, 58, 54, 47, 43, 38, 35, 24, 23, 23, 16, 13, 31, 52, 43, 45, 57, 54], 91: [32, 56, 70, 86, 80, 89, 82, 64, 60, 70, 57, 54, 48, 35, 23, 22, 31, 22, 39, 53, 59, 55, 56, 68], 92: [26, 38, 50, 61, 63, 69, 50, 57, 50, 45, 43, 37, 31, 20, 17, 19, 14, 16, 27, 47, 38, 37, 49, 43], 93: [26, 52, 75, 87, 78, 69, 62, 69, 56, 50, 40, 32, 35, 32, 26, 21, 17, 24, 39, 56, 39, 40, 54, 67], 94: [22, 70, 75, 83, 58, 75, 66, 56, 62, 65, 50, 52, 43, 35, 21, 17, 30, 31, 40, 44, 57, 45, 56, 66], 95: [23, 44, 53, 58, 64, 70, 49, 53, 44, 34, 29, 24, 24, 16, 11, 14, 15, 13, 24, 31, 25, 25, 33, 42], 96: [23, 49, 66, 71, 69, 67, 59, 58, 56, 46, 38, 31, 32, 22, 14, 16, 12, 22, 36, 38, 35, 37, 45, 56], 97: [22, 50, 64, 70, 62, 68, 52, 57, 62, 66, 55, 42, 37, 25, 19, 20, 21, 26, 38, 56, 53, 44, 54, 63], 98: [12, 37, 54, 67, 72, 65, 60, 49, 49, 48, 38, 32, 32, 21, 14, 15, 17, 19, 32, 37, 40, 33, 42, 45], 99: [13, 37, 55, 66, 71, 67, 60, 51, 52, 50, 40, 33, 31, 24, 13, 17, 20, 17, 35, 37, 38, 31, 40, 45], 100: [16, 59, 71, 70, 75, 72, 62, 81, 67, 72, 61, 47, 44, 34, 18, 29, 20, 22, 35, 44, 36, 35, 46, 62], 101: [17, 56, 75, 82, 81, 81, 70, 86, 79, 79, 73, 62, 57, 52, 31, 33, 18, 28, 47, 63, 60, 60, 63, 74], 102: [30, 38, 61, 75, 67, 84, 70, 69, 62, 60, 49, 37, 42, 22, 12, 29, 20, 18, 37, 44, 43, 37, 43, 59], 103: [25, 40, 69, 75, 79, 78, 72, 83, 71, 74, 66, 54, 54, 29, 16, 43, 22, 30, 48, 50, 60, 45, 48, 66], 104: [25, 64, 80, 79, 85, 82, 83, 82, 81, 81, 72, 53, 58, 50, 22, 36, 28, 33, 47, 59, 55, 58, 62, 80], 105: [21, 53, 77, 81, 86, 83, 75, 85, 75, 73, 69, 52, 55, 42, 30, 32, 29, 36, 51, 64, 59, 55, 64, 75], 106: [35, 54, 66, 72, 76, 75, 67, 76, 69, 59, 54, 27, 29, 28, 23, 23, 24, 26, 32, 38, 38, 44, 44, 59], 107: [32, 51, 65, 74, 75, 51, 55, 60, 48, 57, 57, 32, 47, 41, 17, 23, 20, 16, 40, 61, 32, 43, 55, 64], 108: [18, 15, 43, 76, 85, 86, 71, 75, 51, 58, 38, 38, 55, 29, 18, 32, 47, 41, 30, 24, 24, 29, 24, 22], 109: [53, 54, 57, 75, 84, 89, 64, 59, 39, 22, 21, 23, 25, 18, 15, 28, 35, 28, 32, 34, 28, 43, 52, 59], 110: [55, 60, 68, 60, 70, 74, 57, 63, 63, 56, 44, 38, 46, 32, 37, 44, 45, 45, 52, 51, 54, 59, 58, 58], 111: [42, 45, 45, 57, 74, 78, 68, 56, 57, 46, 39, 33, 37, 31, 26, 33, 36, 37, 37, 44, 37, 36, 46, 40], 112: [46, 47, 49, 48, 58, 62, 40, 42, 39, 40, 38, 41, 42, 29, 35, 40, 37, 40, 46, 45, 43, 44, 46, 43], 113: [47, 47, 54, 51, 63, 66, 43, 37, 42, 37, 34, 37, 37, 30, 30, 37, 34, 36, 42, 40, 36, 40, 42, 46], 114: [60, 60, 73, 66, 86, 81, 63, 52, 60, 39, 45, 42, 39, 35, 40, 35, 27, 47, 39, 63, 59, 56, 54, 60], 115: [44, 40, 51, 59, 66, 70, 45, 35, 42, 34, 32, 31, 36, 28, 29, 33, 29, 32, 37, 36, 35, 35, 42, 43], 116: [63, 58, 68, 78, 66, 85, 70, 52, 57, 57, 37, 29, 33, 31, 29, 25, 42, 37, 40, 38, 39, 51, 51, 60], 117: [74, 76, 79, 79, 87, 87, 90, 80, 84, 66, 69, 61, 61, 39, 40, 42, 30, 39, 49, 60, 65, 71, 71, 72], 118: [75, 73, 84, 79, 90, 86, 80, 76, 78, 62, 63, 53, 50, 32, 34, 46, 20, 37, 42, 60, 51, 68, 65, 71], 119: [33, 100, 33, 100, 100, 0, 100, 50, 53, 44, 60, 75, 100, 16, 21, 66, 20, 50, 66, 100, 41, 75, 80, 80], 120: [76, 59, 71, 40, 90, 100, 80, 93, 76, 90, 33, 42, 71, 50, 0, 25, 40, 0, 25, 57, 73, 57, 66, 76], 121: [67, 76, 79, 82, 84, 84, 79, 74, 77, 69, 59, 51, 56, 29, 40, 39, 33, 52, 28, 34, 69, 54, 74, 73], 122: [45, 47, 57, 71, 80, 80, 63, 56, 58, 58, 43, 30, 30, 33, 24, 29, 32, 23, 37, 40, 40, 36, 49, 43], 123: [39, 37, 53, 56, 63, 68, 45, 40, 45, 40, 37, 35, 34, 27, 27, 30, 31, 33, 30, 39, 37, 35, 39, 39], 124: [71, 71, 72, 73, 92, 100, 76, 76, 81, 70, 74, 75, 75, 31, 28, 45, 23, 25, 36, 48, 70, 66, 68, 68], 125: [62, 59, 58, 65, 75, 81, 68, 70, 73, 63, 45, 51, 33, 25, 30, 29, 32, 24, 41, 52, 44, 50, 54, 58], 126: [43, 48, 64, 62, 67, 71, 45, 65, 61, 48, 40, 32, 29, 20, 19, 19, 28, 20, 24, 38, 37, 42, 48, 54], 127: [53, 58, 67, 67, 81, 75, 75, 87, 74, 77, 42, 48, 38, 26, 25, 62, 14, 16, 47, 53, 58, 66, 66, 69], 128: [53, 48, 60, 67, 78, 77, 68, 71, 63, 53, 46, 34, 35, 22, 20, 21, 28, 22, 27, 44, 40, 47, 53, 59], 129: [59, 61, 71, 77, 83, 87, 90, 91, 81, 62, 52, 51, 46, 30, 24, 24, 39, 35, 38, 64, 51, 56, 62, 74], 130: [46, 49, 57, 59, 69, 69, 62, 63, 63, 45, 39, 32, 33, 25, 17, 19, 28, 18, 26, 35, 36, 43, 48, 53], 131: [51, 53, 65, 72, 75, 83, 74, 75, 69, 65, 49, 46, 36, 23, 24, 27, 28, 24, 35, 47, 44, 48, 54, 59], 132: [52, 50, 67, 78, 81, 81, 67, 71, 73, 55, 57, 44, 38, 24, 18, 15, 26, 12, 25, 53, 41, 42, 59, 62], 133: [46, 49, 63, 74, 79, 77, 71, 65, 65, 59, 62, 50, 49, 24, 22, 18, 30, 19, 37, 53, 42, 43, 57, 52], 134: [62, 67, 68, 81, 76, 86, 63, 80, 75, 67, 57, 44, 49, 36, 20, 14, 25, 16, 36, 69, 59, 51, 69, 67], 135: [54, 67, 81, 75, 93, 85, 66, 79, 79, 70, 67, 55, 52, 29, 20, 16, 18, 18, 36, 73, 60, 59, 72, 69], 136: [42, 55, 77, 90, 83, 84, 80, 82, 76, 64, 59, 39, 47, 23, 27, 17, 16, 3, 26, 46, 53, 48, 61, 58], 137: [56, 66, 69, 83, 67, 88, 72, 85, 79, 66, 62, 53, 43, 36, 26, 14, 17, 18, 34, 75, 59, 55, 72, 70], 138: [25, 30, 53, 61, 71, 80, 55, 62, 51, 50, 46, 37, 36, 28, 15, 8, 14, 10, 19, 38, 31, 29, 43, 41], 139: [26, 43, 50, 59, 70, 70, 38, 56, 48, 36, 35, 35, 27, 23, 18, 14, 10, 15, 16, 37, 35, 27, 46, 47], 140: [34, 45, 61, 62, 71, 81, 62, 66, 62, 57, 56, 45, 39, 30, 25, 16, 23, 20, 35, 61, 52, 49, 70, 62], 141: [34, 52, 62, 68, 74, 75, 46, 61, 61, 52, 48, 47, 42, 28, 22, 16, 14, 13, 24, 56, 48, 43, 64, 55], 142: [54, 56, 72, 85, 76, 70, 78, 78, 73, 73, 51, 51, 49, 19, 15, 12, 12, 20, 29, 62, 58, 51, 66, 64], 143: [38, 57, 65, 73, 67, 81, 55, 74, 64, 54, 49, 47, 39, 25, 26, 22, 14, 14, 27, 61, 56, 44, 68, 61], 144: [29, 42, 56, 68, 69, 76, 53, 70, 59, 56, 44, 34, 35, 19, 15, 10, 13, 10, 22, 40, 42, 33, 48, 52], 145: [32, 47, 57, 69, 68, 74, 53, 59, 46, 40, 32, 32, 31, 23, 13, 15, 15, 15, 22, 38, 36, 36, 44, 48], 146: [39, 60, 66, 77, 76, 73, 62, 70, 54, 59, 62, 47, 47, 25, 25, 25, 19, 13, 32, 44, 43, 32, 52, 56], 147: [38, 37, 40, 62, 73, 71, 49, 66, 41, 31, 31, 30, 20, 33, 27, 20, 34, 31, 34, 37, 27, 42, 34, 36], 148: [40, 52, 51, 45, 78, 25, 42, 61, 41, 48, 44, 40, 34, 48, 44, 28, 40, 39, 41, 46, 43, 52, 36, 50], 149: [34, 49, 37, 46, 82, 53, 38, 44, 36, 46, 16, 22, 20, 28, 34, 19, 38, 38, 50, 43, 44, 37, 33, 48], 150: [46, 58, 44, 43, 68, 80, 42, 46, 38, 48, 17, 25, 22, 30, 37, 25, 37, 36, 48, 48, 57, 41, 47, 57], 151: [35, 49, 41, 50, 50, 78, 29, 44, 24, 40, 19, 24, 19, 28, 26, 24, 26, 38, 37, 44, 38, 44, 31, 46], 152: [42, 50, 53, 59, 75, 100, 62, 61, 30, 40, 20, 25, 24, 23, 30, 26, 32, 40, 34, 34, 31, 46, 41, 54], 153: [41, 41, 34, 46, 55, 72, 63, 42, 33, 36, 30, 31, 26, 22, 37, 28, 31, 47, 50, 50, 39, 43, 36, 48], 154: [57, 50, 59, 65, 79, 84, 73, 58, 35, 37, 34, 35, 34, 32, 35, 41, 43, 48, 57, 55, 46, 48, 52, 57], 155: [58, 54, 63, 66, 77, 82, 74, 58, 41, 43, 38, 33, 41, 45, 38, 41, 46, 51, 61, 55, 45, 52, 56, 57], 156: [63, 55, 66, 64, 72, 79, 80, 68, 54, 50, 51, 44, 54, 53, 43, 49, 48, 56, 69, 57, 54, 59, 59, 60], 157: [77, 71, 74, 73, 81, 91, 87, 80, 67, 54, 51, 53, 51, 58, 58, 57, 56, 66, 76, 76, 65, 77, 78, 76], 158: [75, 70, 73, 81, 81, 94, 89, 79, 71, 58, 49, 54, 60, 55, 54, 54, 54, 64, 75, 75, 69, 77, 79, 74], 159: [19, 40, 67, 77, 72, 75, 61, 67, 66, 58, 54, 44, 37, 33, 29, 26, 25, 23, 42, 53, 49, 44, 51, 58], 160: [22, 47, 66, 71, 88, 82, 67, 65, 66, 64, 47, 37, 40, 27, 20, 28, 33, 28, 45, 54, 57, 49, 53, 57], 161: [30, 54, 79, 85, 76, 82, 78, 82, 80, 73, 63, 53, 50, 43, 34, 33, 36, 35, 52, 65, 63, 59, 68, 71], 162: [9, 21, 43, 54, 59, 48, 44, 63, 65, 57, 50, 45, 36, 29, 29, 26, 24, 28, 43, 50, 45, 39, 40, 40], 163: [37, 55, 86, 74, 78, 92, 76, 90, 85, 74, 60, 46, 56, 43, 33, 29, 44, 41, 61, 73, 56, 66, 77, 58], 164: [29, 54, 83, 73, 65, 91, 80, 85, 61, 60, 61, 43, 30, 44, 25, 24, 27, 33, 48, 59, 56, 53, 67, 62], 165: [25, 54, 71, 73, 61, 92, 90, 94, 79, 85, 66, 58, 47, 62, 22, 29, 30, 34, 38, 72, 58, 46, 64, 54], 166: [31, 54, 80, 84, 84, 92, 85, 88, 76, 75, 74, 49, 61, 36, 30, 29, 35, 37, 61, 69, 62, 66, 70, 72], 167: [36, 43, 56, 67, 71, 72, 59, 63, 53, 41, 37, 31, 31, 16, 14, 15, 26, 25, 30, 40, 32, 37, 42, 44], 168: [27, 41, 45, 62, 70, 70, 32, 64, 48, 38, 37, 23, 36, 20, 16, 15, 14, 20, 22, 37, 28, 35, 34, 41], 169: [38, 52, 60, 73, 80, 74, 59, 70, 54, 43, 44, 26, 33, 23, 18, 13, 15, 20, 27, 34, 31, 38, 42, 56], 170: [43, 48, 55, 64, 68, 70, 53, 62, 47, 45, 38, 30, 34, 21, 14, 22, 32, 28, 31, 35, 31, 40, 48, 51], 171: [46, 61, 66, 69, 72, 86, 73, 70, 47, 46, 42, 33, 34, 25, 22, 29, 33, 31, 36, 42, 39, 50, 52, 62], 172: [53, 60, 73, 83, 80, 84, 84, 85, 66, 53, 54, 47, 43, 25, 10, 29, 35, 37, 47, 49, 53, 66, 70, 80], 173: [42, 55, 66, 67, 77, 86, 64, 67, 51, 53, 50, 43, 39, 28, 24, 33, 33, 28, 38, 46, 45, 47, 54, 58], 174: [45, 60, 69, 65, 70, 81, 62, 69, 49, 46, 44, 40, 31, 30, 19, 28, 31, 25, 33, 41, 40, 43, 55, 61], 175: [64, 67, 77, 79, 81, 91, 91, 79, 70, 53, 31, 61, 52, 37, 21, 41, 36, 31, 54, 55, 58, 63, 78, 80], 176: [47, 51, 57, 67, 67, 75, 71, 70, 49, 48, 35, 25, 31, 18, 17, 28, 38, 33, 29, 34, 31, 37, 44, 49], 177: [56, 63, 75, 73, 71, 93, 87, 91, 71, 61, 53, 40, 45, 45, 20, 26, 41, 33, 47, 61, 51, 56, 70, 68], 178: [47, 51, 59, 71, 77, 79, 73, 76, 54, 45, 35, 30, 37, 20, 25, 35, 47, 41, 33, 41, 38, 42, 48, 50], 179: [39, 54, 73, 87, 89, 89, 55, 65, 49, 41, 33, 32, 41, 28, 31, 38, 43, 41, 32, 39, 51, 37, 45, 57], 180: [59, 74, 78, 83, 88, 91, 91, 82, 75, 72, 66, 41, 48, 52, 38, 41, 45, 44, 62, 54, 56, 62, 53, 77], 181: [35, 50, 67, 82, 87, 86, 52, 72, 56, 39, 31, 34, 27, 28, 28, 45, 41, 37, 27, 41, 37, 30, 36, 46], 182: [43, 48, 61, 82, 87, 85, 81, 72, 51, 43, 34, 28, 35, 23, 22, 34, 41, 38, 32, 38, 34, 46, 43, 51], 183: [61, 65, 83, 84, 91, 86, 92, 75, 59, 53, 33, 38, 28, 27, 27, 31, 49, 42, 46, 46, 36, 54, 55, 69], 184: [32, 35, 48, 62, 76, 88, 53, 54, 44, 31, 28, 26, 31, 25, 20, 25, 33, 35, 30, 31, 26, 22, 38, 34], 185: [33, 36, 49, 48, 50, 51, 31, 32, 31, 35, 28, 23, 31, 22, 19, 18, 22, 23, 19, 30, 29, 31, 32, 32], 186: [35, 38, 60, 61, 48, 61, 49, 47, 41, 32, 34, 25, 27, 20, 13, 20, 17, 18, 24, 31, 27, 37, 40, 48], 187: [65, 69, 76, 71, 76, 87, 67, 79, 71, 55, 64, 46, 43, 29, 29, 34, 29, 33, 37, 50, 46, 63, 64, 68], 188: [38, 46, 57, 59, 60, 74, 64, 53, 43, 48, 31, 25, 35, 23, 28, 20, 25, 23, 30, 41, 36, 45, 47, 44], 189: [54, 57, 66, 63, 71, 70, 72, 63, 52, 47, 45, 29, 36, 25, 30, 21, 24, 27, 36, 44, 45, 55, 55, 53], 190: [58, 69, 68, 80, 93, 73, 73, 62, 72, 50, 46, 52, 50, 16, 41, 36, 23, 42, 52, 68, 55, 57, 63, 66], 191: [53, 60, 70, 64, 90, 74, 70, 75, 58, 39, 42, 38, 22, 26, 17, 23, 34, 27, 34, 37, 40, 51, 50, 50], 192: [51, 61, 69, 66, 80, 91, 61, 63, 52, 36, 39, 33, 22, 23, 17, 25, 32, 26, 14, 31, 30, 37, 39, 50], 193: [47, 54, 61, 60, 69, 65, 52, 51, 48, 41, 34, 28, 27, 22, 24, 21, 26, 22, 26, 35, 34, 41, 45, 48], 194: [47, 76, 73, 85, 88, 82, 87, 83, 86, 67, 64, 45, 50, 35, 22, 30, 23, 26, 39, 54, 39, 55, 59, 62], 195: [66, 72, 76, 79, 83, 83, 77, 84, 90, 77, 75, 37, 61, 42, 16, 37, 37, 33, 29, 62, 66, 51, 59, 67], 196: [35, 35, 55, 64, 67, 71, 45, 33, 41, 39, 33, 36, 36, 27, 30, 36, 36, 40, 39, 46, 37, 28, 37, 40], 197: [56, 57, 53, 71, 72, 80, 80, 47, 53, 42, 28, 22, 32, 22, 34, 36, 23, 36, 28, 44, 37, 38, 47, 61], 198: [41, 37, 51, 62, 69, 66, 50, 38, 41, 37, 30, 34, 33, 26, 26, 32, 36, 37, 34, 44, 40, 32, 37, 43], 199: [58, 66, 73, 76, 82, 85, 89, 76, 71, 58, 41, 40, 39, 20, 26, 27, 46, 35, 31, 63, 45, 56, 62, 70], 200: [53, 72, 85, 71, 100, 100, 50, 80, 100, 66, 50, 75, 100, 0, 0, 0, 0, 0, 100, 66, 62, 0, 100, 66], 201: [36, 41, 54, 64, 69, 66, 44, 39, 41, 39, 30, 33, 34, 26, 26, 30, 30, 30, 32, 41, 34, 34, 36, 43], 202: [51, 51, 57, 65, 72, 74, 65, 65, 69, 62, 40, 45, 39, 28, 29, 32, 30, 27, 42, 53, 40, 42, 43, 52], 203: [46, 54, 62, 68, 73, 82, 70, 58, 60, 45, 36, 31, 27, 22, 20, 19, 24, 27, 30, 43, 37, 47, 55, 62], 204: [43, 47, 58, 70, 70, 80, 64, 76, 68, 62, 57, 43, 37, 24, 19, 22, 21, 17, 25, 45, 43, 45, 51, 56], 205: [34, 43, 51, 64, 63, 73, 42, 48, 48, 40, 42, 34, 26, 21, 20, 18, 21, 16, 31, 39, 35, 31, 44, 43], 206: [35, 41, 52, 69, 66, 74, 43, 59, 52, 44, 46, 35, 28, 20, 19, 17, 21, 17, 31, 42, 39, 34, 45, 46], 207: [32, 43, 51, 64, 71, 75, 40, 52, 49, 40, 40, 29, 30, 21, 18, 18, 14, 15, 24, 38, 36, 32, 45, 43], 208: [43, 47, 59, 70, 72, 77, 64, 71, 63, 59, 52, 42, 34, 29, 18, 16, 24, 19, 28, 51, 42, 42, 52, 56], 209: [53, 33, 55, 100, 88, 80, 100, 76, 84, 66, 38, 100, 47, 55, 75, 33, 45, 22, 64, 41, 37, 57, 57, 64], 210: [47, 50, 44, 46, 65, 94, 56, 53, 39, 42, 45, 27, 26, 21, 30, 30, 40, 35, 46, 35, 36, 45, 50, 38], 211: [51, 54, 35, 64, 52, 68, 37, 63, 40, 44, 24, 44, 41, 13, 39, 33, 41, 52, 56, 54, 54, 54, 56, 49], 212: [76, 77, 84, 80, 83, 87, 80, 79, 73, 55, 46, 55, 52, 43, 36, 28, 23, 20, 54, 73, 47, 58, 72, 77], 213: [39, 44, 55, 52, 72, 67, 43, 40, 42, 39, 33, 32, 33, 27, 29, 29, 34, 32, 36, 39, 37, 31, 35, 45], 214: [41, 47, 54, 62, 73, 76, 52, 44, 37, 31, 24, 30, 19, 20, 23, 20, 23, 24, 25, 34, 29, 27, 35, 43], 215: [19, 25, 35, 50, 57, 63, 27, 29, 26, 20, 19, 25, 18, 15, 17, 17, 21, 13, 19, 26, 23, 18, 22, 24], 216: [39, 45, 50, 68, 68, 57, 49, 48, 50, 35, 34, 29, 24, 21, 18, 20, 22, 20, 29, 44, 33, 33, 40, 50], 217: [32, 34, 48, 59, 60, 57, 33, 32, 30, 24, 19, 23, 20, 20, 12, 16, 16, 15, 17, 36, 33, 28, 39, 39], 218: [31, 50, 73, 73, 82, 76, 84, 82, 65, 64, 62, 34, 44, 41, 32, 20, 20, 26, 27, 46, 42, 52, 58, 57], 219: [62, 72, 76, 83, 82, 84, 92, 82, 80, 76, 77, 56, 52, 54, 21, 40, 21, 35, 40, 70, 59, 59, 63, 70], 220: [44, 54, 55, 75, 75, 70, 59, 60, 53, 44, 45, 40, 27, 22, 19, 22, 23, 26, 35, 47, 43, 35, 47, 53], 221: [42, 48, 71, 74, 78, 76, 63, 64, 69, 48, 51, 41, 38, 27, 18, 25, 17, 22, 39, 55, 44, 45, 52, 65], 222: [36, 50, 60, 73, 75, 67, 52, 55, 48, 39, 41, 33, 27, 20, 17, 21, 25, 20, 29, 42, 30, 34, 41, 46], 223: [26, 27, 34, 51, 53, 52, 25, 36, 32, 25, 21, 22, 21, 17, 11, 17, 17, 13, 18, 26, 23, 23, 28, 31], 224: [26, 38, 47, 57, 57, 61, 31, 48, 32, 29, 24, 30, 24, 23, 18, 20, 15, 19, 21, 27, 25, 21, 32, 38], 225: [6, 11, 31, 53, 54, 50, 14, 22, 37, 26, 28, 27, 20, 18, 15, 18, 15, 16, 15, 19, 17, 14, 17, 15], 226: [32, 40, 55, 63, 62, 87, 62, 78, 43, 25, 30, 26, 20, 18, 18, 15, 17, 8, 20, 30, 25, 26, 31, 56], 227: [41, 53, 68, 78, 77, 78, 50, 68, 81, 69, 65, 47, 39, 35, 23, 23, 16, 10, 34, 58, 48, 46, 57, 56], 228: [19, 26, 34, 49, 56, 47, 21, 33, 28, 20, 20, 18, 17, 14, 11, 13, 12, 12, 17, 23, 19, 19, 25, 25], 229: [20, 29, 36, 55, 58, 61, 23, 37, 33, 28, 22, 23, 18, 13, 11, 12, 15, 15, 23, 24, 19, 20, 27, 35], 230: [42, 55, 57, 71, 77, 72, 58, 72, 54, 50, 47, 31, 32, 20, 21, 17, 15, 12, 30, 41, 35, 37, 50, 57], 231: [23, 30, 48, 68, 83, 83, 36, 47, 24, 26, 20, 23, 22, 18, 17, 26, 31, 27, 27, 29, 23, 28, 29, 35], 232: [46, 51, 67, 71, 78, 74, 47, 64, 31, 36, 30, 32, 35, 19, 17, 26, 33, 29, 29, 42, 45, 45, 46, 52], 233: [12, 22, 21, 33, 62, 50, 28, 76, 33, 40, 0, 62, 44, 9, 0, 38, 36, 50, 16, 36, 48, 38, 13, 28], 234: [50, 55, 72, 77, 80, 72, 61, 70, 44, 32, 24, 35, 33, 19, 17, 25, 34, 29, 28, 40, 39, 45, 46, 52], 235: [37, 36, 49, 67, 74, 72, 53, 49, 25, 23, 27, 24, 26, 19, 19, 24, 32, 34, 33, 38, 29, 42, 46, 56], 236: [37, 38, 48, 67, 74, 76, 66, 52, 28, 21, 25, 19, 27, 20, 25, 31, 31, 33, 35, 33, 29, 41, 39, 48], 237: [50, 52, 66, 83, 89, 90, 66, 66, 37, 28, 27, 32, 44, 23, 19, 34, 36, 40, 41, 43, 39, 52, 56, 58], 238: [53, 51, 58, 67, 73, 80, 75, 65, 38, 20, 24, 21, 29, 24, 20, 36, 36, 38, 43, 45, 38, 51, 58, 59], 239: [80, 76, 86, 85, 87, 90, 92, 86, 68, 34, 36, 54, 48, 35, 56, 55, 44, 55, 66, 76, 69, 74, 78, 86], 240: [83, 83, 87, 77, 75, 100, 94, 95, 72, 56, 61, 81, 61, 51, 50, 61, 36, 40, 65, 75, 77, 70, 89, 94], 241: [47, 46, 52, 63, 69, 82, 78, 69, 48, 33, 39, 32, 39, 37, 39, 41, 38, 43, 51, 53, 48, 58, 58, 61], 242: [67, 62, 66, 76, 73, 76, 83, 81, 51, 34, 37, 35, 44, 31, 41, 40, 40, 44, 52, 60, 50, 62, 61, 74], 243: [81, 82, 84, 73, 85, 100, 95, 92, 52, 57, 50, 40, 52, 40, 30, 45, 24, 62, 50, 55, 71, 67, 80, 85], 244: [73, 73, 88, 76, 66, 75, 90, 80, 58, 29, 55, 39, 39, 40, 36, 42, 43, 37, 33, 71, 43, 52, 79, 88], 245: [77, 82, 79, 65, 72, 94, 100, 95, 56, 25, 44, 42, 82, 38, 33, 46, 18, 27, 53, 60, 57, 54, 87, 87], 246: [59, 60, 47, 67, 63, 80, 83, 76, 55, 29, 35, 27, 32, 28, 35, 45, 38, 32, 36, 48, 30, 49, 55, 63], 247: [58, 54, 64, 68, 78, 85, 71, 63, 37, 29, 24, 32, 35, 22, 36, 36, 36, 40, 48, 50, 43, 55, 55, 64], 248: [73, 76, 82, 100, 46, 66, 80, 83, 62, 30, 17, 36, 48, 35, 47, 55, 45, 54, 50, 50, 50, 73, 64, 78], 249: [66, 68, 80, 61, 88, 90, 97, 94, 86, 68, 55, 51, 65, 45, 55, 50, 46, 47, 70, 63, 56, 70, 76, 79], 250: [69, 78, 80, 80, 78, 89, 92, 86, 69, 43, 37, 30, 51, 21, 32, 41, 41, 37, 53, 55, 48, 56, 66, 70], 251: [48, 57, 57, 52, 83, 75, 88, 92, 76, 69, 46, 34, 50, 61, 29, 40, 39, 45, 47, 44, 38, 47, 54, 64], 252: [49, 44, 50, 58, 61, 77, 68, 64, 35, 29, 22, 27, 32, 22, 33, 33, 36, 37, 42, 44, 33, 42, 44, 50], 253: [57, 60, 64, 62, 64, 64, 66, 71, 37, 20, 20, 30, 30, 23, 19, 36, 33, 38, 40, 49, 38, 50, 52, 61], 254: [72, 71, 81, 72, 74, 82, 93, 93, 77, 52, 47, 53, 58, 48, 45, 53, 27, 53, 61, 65, 54, 78, 74, 67], 255: [42, 47, 40, 53, 67, 75, 62, 72, 31, 26, 19, 24, 24, 21, 16, 28, 30, 40, 29, 28, 28, 35, 40, 41], 256: [60, 67, 65, 65, 78, 88, 93, 80, 61, 42, 33, 47, 36, 22, 26, 38, 33, 50, 51, 50, 54, 40, 56, 67], 257: [35, 33, 21, 44, 41, 77, 60, 70, 19, 31, 13, 16, 16, 22, 10, 12, 30, 28, 20, 25, 19, 23, 25, 22], 258: [43, 46, 51, 47, 76, 70, 51, 55, 21, 22, 9, 21, 8, 20, 15, 20, 21, 35, 18, 20, 18, 32, 42, 25], 259: [50, 64, 62, 58, 100, 69, 89, 85, 73, 74, 35, 50, 72, 57, 33, 22, 33, 43, 70, 61, 61, 52, 61, 50], 260: [51, 53, 62, 51, 83, 88, 84, 82, 77, 72, 62, 54, 62, 50, 40, 50, 51, 49, 60, 60, 61, 53, 66, 55], 261: [70, 71, 64, 76, 81, 76, 95, 90, 76, 81, 48, 40, 57, 48, 52, 47, 55, 54, 63, 62, 59, 53, 77, 75], 262: [59, 64, 86, 75, 66, 93, 66, 83, 73, 68, 42, 45, 65, 39, 43, 60, 50, 55, 73, 56, 64, 51, 73, 73], 263: [63, 62, 76, 62, 76, 77, 63, 67, 50, 43, 25, 18, 31, 29, 33, 40, 35, 46, 52, 40, 53, 41, 53, 62], 264: [47, 51, 52, 55, 67, 70, 53, 46, 44, 39, 37, 38, 35, 38, 43, 35, 41, 39, 50, 49, 54, 45, 45, 53], 265: [38, 45, 48, 48, 69, 69, 50, 45, 42, 34, 42, 36, 37, 35, 40, 32, 35, 35, 42, 43, 47, 42, 46, 47], 266: [45, 49, 59, 66, 78, 76, 62, 52, 46, 37, 33, 33, 31, 22, 27, 24, 31, 30, 32, 41, 35, 39, 43, 48], 267: [58, 57, 72, 68, 83, 76, 70, 63, 51, 46, 39, 45, 33, 32, 25, 33, 30, 26, 34, 51, 36, 43, 49, 63], 268: [38, 42, 50, 63, 76, 70, 45, 43, 37, 33, 26, 32, 19, 22, 25, 18, 21, 23, 27, 31, 29, 31, 32, 39], 269: [40, 42, 40, 51, 52, 66, 38, 44, 42, 33, 40, 38, 38, 32, 42, 30, 34, 44, 47, 52, 50, 44, 45, 47], 270: [64, 58, 58, 65, 70, 62, 50, 60, 51, 40, 39, 47, 28, 41, 40, 36, 38, 56, 61, 63, 51, 52, 53, 60], 271: [75, 73, 77, 76, 72, 82, 91, 81, 75, 69, 55, 59, 60, 40, 51, 31, 36, 40, 54, 52, 58, 63, 68, 75], 272: [55, 61, 67, 71, 86, 90, 90, 55, 59, 36, 39, 49, 47, 40, 46, 46, 27, 32, 50, 63, 53, 53, 49, 60], 273: [64, 64, 55, 69, 75, 58, 57, 54, 53, 44, 43, 47, 40, 40, 39, 33, 31, 42, 62, 59, 47, 55, 59, 63], 274: [68, 66, 77, 72, 85, 86, 82, 91, 67, 55, 82, 76, 82, 53, 47, 34, 66, 69, 62, 68, 58, 47, 75, 70], 275: [67, 80, 78, 85, 84, 94, 90, 78, 81, 60, 52, 53, 51, 45, 22, 35, 36, 36, 53, 62, 52, 53, 73, 74], 276: [54, 57, 51, 60, 64, 62, 53, 52, 49, 37, 48, 45, 34, 39, 42, 31, 28, 44, 62, 55, 45, 50, 54, 58], 277: [68, 74, 76, 87, 95, 73, 75, 78, 84, 44, 68, 80, 51, 27, 36, 58, 39, 47, 50, 44, 57, 44, 59, 78], 278: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 279: [64, 67, 75, 76, 78, 76, 81, 74, 71, 50, 57, 36, 44, 28, 31, 29, 37, 38, 42, 51, 51, 42, 59, 66], 280: [60, 58, 55, 70, 67, 58, 50, 56, 47, 43, 45, 38, 35, 33, 38, 36, 32, 46, 60, 59, 46, 44, 54, 62], 281: [54, 58, 74, 66, 78, 68, 73, 59, 54, 48, 34, 41, 29, 35, 34, 32, 40, 43, 53, 60, 52, 49, 54, 57], 282: [57, 67, 74, 71, 81, 77, 79, 67, 62, 49, 42, 32, 48, 19, 33, 22, 35, 37, 41, 43, 42, 36, 53, 61], 283: [51, 55, 65, 66, 77, 77, 73, 60, 57, 51, 39, 30, 32, 27, 34, 27, 34, 36, 42, 52, 42, 44, 45, 57], 284: [50, 48, 56, 63, 68, 62, 48, 43, 47, 36, 38, 36, 33, 33, 30, 25, 36, 39, 50, 42, 35, 37, 40, 52], 285: [50, 50, 54, 59, 69, 49, 33, 41, 40, 30, 33, 30, 29, 26, 27, 23, 31, 35, 43, 39, 33, 33, 39, 50], 286: [59, 59, 62, 58, 70, 53, 53, 56, 57, 39, 33, 36, 25, 20, 29, 24, 30, 39, 44, 49, 40, 49, 48, 54], 287: [61, 56, 67, 67, 90, 82, 58, 59, 61, 50, 35, 37, 26, 24, 27, 23, 30, 35, 45, 57, 45, 43, 49, 53], 288: [59, 55, 60, 58, 78, 74, 57, 57, 56, 45, 35, 35, 24, 22, 25, 26, 27, 27, 41, 53, 40, 41, 42, 54], 289: [53, 54, 54, 56, 76, 57, 35, 46, 46, 37, 39, 27, 36, 36, 31, 24, 30, 36, 46, 43, 35, 38, 47, 50], 290: [59, 53, 59, 68, 83, 89, 76, 82, 81, 76, 48, 52, 50, 42, 40, 37, 37, 32, 46, 62, 60, 57, 66, 67], 291: [62, 58, 77, 70, 88, 87, 93, 85, 91, 73, 57, 62, 52, 35, 51, 40, 26, 45, 61, 66, 73, 56, 65, 71], 292: [51, 54, 58, 69, 79, 60, 49, 55, 55, 37, 40, 30, 31, 30, 30, 25, 27, 31, 46, 42, 35, 36, 49, 51], 293: [23, 44, 54, 58, 64, 75, 51, 57, 48, 44, 37, 35, 27, 23, 14, 21, 19, 16, 25, 39, 32, 31, 41, 41], 294: [43, 66, 75, 81, 75, 82, 67, 79, 71, 65, 54, 47, 38, 23, 19, 26, 21, 16, 28, 60, 54, 47, 65, 69], 295: [27, 40, 55, 67, 72, 77, 57, 58, 51, 42, 38, 34, 32, 21, 14, 20, 16, 15, 24, 39, 37, 34, 37, 41], 296: [61, 62, 58, 72, 77, 88, 87, 85, 75, 48, 42, 24, 46, 27, 22, 35, 36, 40, 55, 37, 41, 33, 52, 60], 297: [52, 55, 63, 69, 85, 80, 76, 79, 64, 50, 56, 43, 68, 34, 58, 42, 35, 25, 59, 38, 35, 59, 67, 68], 298: [49, 46, 47, 68, 70, 85, 85, 82, 77, 45, 37, 28, 39, 11, 31, 17, 38, 33, 52, 30, 42, 29, 39, 53], 299: [79, 75, 73, 76, 78, 87, 82, 91, 87, 64, 70, 26, 77, 50, 8, 20, 52, 52, 38, 35, 33, 26, 75, 68], 300: [63, 67, 64, 80, 80, 88, 79, 78, 75, 66, 56, 51, 53, 53, 46, 38, 35, 33, 45, 64, 70, 66, 73, 68], 301: [58, 61, 61, 70, 81, 86, 85, 85, 79, 70, 65, 61, 65, 40, 45, 24, 50, 28, 62, 54, 50, 46, 66, 71], 302: [57, 62, 58, 68, 62, 89, 52, 58, 62, 46, 39, 43, 46, 26, 18, 57, 33, 40, 38, 31, 33, 52, 52, 60], 303: [67, 67, 70, 81, 81, 89, 81, 79, 77, 53, 44, 40, 44, 23, 29, 51, 19, 34, 62, 39, 45, 55, 69, 68], 304: [48, 47, 50, 62, 77, 75, 46, 47, 48, 35, 40, 45, 39, 34, 42, 35, 36, 40, 45, 52, 53, 42, 50, 51], 305: [63, 66, 69, 68, 71, 76, 71, 64, 58, 49, 51, 50, 45, 40, 45, 44, 45, 54, 56, 66, 65, 64, 62, 67], 306: [39, 46, 43, 56, 72, 63, 44, 40, 40, 37, 38, 41, 39, 36, 39, 31, 37, 42, 51, 49, 48, 39, 45, 45], 307: [45, 53, 49, 63, 73, 63, 42, 55, 46, 33, 35, 28, 28, 28, 28, 27, 26, 28, 40, 36, 34, 35, 45, 46], 308: [44, 50, 57, 67, 67, 72, 46, 47, 44, 41, 37, 39, 37, 29, 34, 32, 33, 35, 40, 40, 40, 37, 38, 50], 309: [42, 42, 53, 68, 74, 72, 52, 46, 52, 44, 42, 43, 36, 35, 35, 34, 40, 32, 47, 40, 39, 38, 43, 46], 310: [52, 60, 63, 62, 73, 73, 61, 53, 55, 49, 36, 46, 39, 41, 38, 38, 40, 39, 44, 50, 50, 45, 47, 58], 311: [45, 48, 55, 55, 66, 69, 55, 48, 51, 42, 37, 38, 35, 35, 35, 36, 36, 38, 40, 45, 38, 38, 41, 49], 312: [45, 49, 63, 79, 82, 75, 57, 60, 41, 38, 35, 29, 35, 22, 29, 25, 31, 27, 32, 40, 43, 40, 46, 54], 313: [35, 41, 55, 73, 79, 76, 50, 50, 36, 30, 30, 24, 22, 22, 19, 22, 28, 18, 27, 38, 26, 28, 32, 44], 314: [75, 69, 77, 81, 85, 86, 73, 79, 70, 67, 54, 54, 46, 41, 30, 33, 33, 36, 48, 60, 56, 55, 59, 62], 315: [44, 50, 59, 77, 87, 89, 60, 51, 42, 39, 34, 26, 26, 25, 20, 20, 30, 25, 29, 45, 29, 32, 34, 57], 316: [67, 62, 71, 72, 83, 88, 80, 74, 71, 56, 60, 50, 55, 53, 41, 24, 35, 38, 45, 55, 51, 50, 53, 49], 317: [50, 49, 64, 78, 86, 72, 56, 58, 46, 40, 40, 31, 34, 24, 27, 26, 32, 27, 29, 49, 42, 34, 54, 57], 318: [53, 64, 72, 87, 91, 92, 83, 85, 58, 40, 27, 63, 31, 7, 58, 25, 22, 54, 52, 33, 4, 33, 46, 37], 319: [45, 49, 58, 73, 77, 73, 53, 52, 41, 35, 32, 28, 25, 18, 18, 20, 27, 22, 26, 40, 29, 32, 37, 51], 320: [31, 37, 56, 78, 81, 76, 39, 50, 37, 28, 31, 23, 25, 22, 19, 18, 29, 15, 26, 30, 26, 24, 26, 41], 321: [30, 38, 53, 62, 69, 65, 37, 43, 37, 29, 25, 26, 25, 19, 17, 20, 19, 17, 18, 29, 22, 24, 32, 31], 322: [26, 33, 50, 71, 73, 74, 36, 44, 38, 24, 24, 19, 20, 19, 18, 16, 19, 15, 21, 24, 18, 19, 25, 30], 323: [29, 31, 44, 68, 61, 67, 31, 47, 39, 27, 23, 20, 23, 21, 17, 18, 21, 16, 24, 25, 20, 20, 27, 32], 324: [34, 37, 51, 68, 70, 69, 37, 53, 51, 41, 29, 22, 25, 20, 19, 19, 24, 19, 25, 30, 24, 26, 33, 38], 325: [35, 39, 50, 69, 68, 72, 37, 52, 48, 38, 30, 25, 25, 20, 19, 19, 22, 21, 26, 27, 25, 28, 32, 41], 326: [22, 33, 50, 80, 0, 100, 33, 53, 33, 57, 62, 33, 26, 26, 15, 18, 28, 33, 27, 33, 33, 20, 22, 54], 327: [41, 61, 50, 84, 16, 75, 66, 43, 54, 45, 38, 42, 50, 39, 55, 34, 4, 12, 34, 68, 51, 29, 54, 73], 328: [38, 51, 50, 69, 68, 64, 58, 56, 44, 32, 32, 29, 28, 27, 15, 19, 16, 20, 20, 32, 31, 33, 32, 43], 329: [62, 65, 72, 83, 60, 76, 60, 65, 56, 49, 40, 43, 44, 37, 45, 29, 15, 14, 26, 64, 59, 40, 64, 71], 330: [39, 50, 56, 68, 73, 73, 68, 68, 49, 47, 37, 34, 26, 19, 14, 15, 15, 17, 22, 32, 32, 29, 42, 50], 331: [74, 86, 88, 84, 66, 88, 92, 93, 68, 62, 23, 38, 42, 28, 57, 32, 22, 21, 30, 57, 51, 67, 81, 85], 332: [48, 47, 55, 67, 72, 73, 47, 67, 54, 36, 31, 24, 29, 18, 20, 20, 26, 19, 28, 39, 35, 34, 43, 53], 333: [56, 76, 75, 85, 83, 93, 93, 86, 71, 73, 63, 59, 55, 32, 25, 30, 29, 29, 51, 66, 59, 59, 76, 76], 334: [55, 68, 73, 77, 84, 86, 82, 85, 65, 62, 54, 56, 40, 31, 15, 26, 23, 22, 34, 51, 49, 43, 62, 67], 335: [52, 59, 59, 71, 72, 79, 44, 61, 47, 45, 31, 27, 36, 28, 22, 23, 26, 19, 31, 45, 39, 42, 55, 60], 336: [33, 48, 38, 58, 60, 71, 62, 59, 33, 34, 34, 28, 30, 28, 17, 26, 34, 20, 33, 37, 28, 33, 42, 43], 337: [56, 66, 75, 79, 89, 86, 79, 86, 66, 64, 56, 51, 48, 33, 19, 28, 25, 23, 46, 63, 57, 53, 68, 73], 338: [38, 41, 49, 63, 68, 77, 61, 64, 42, 39, 40, 42, 33, 26, 13, 21, 31, 24, 38, 48, 38, 37, 49, 54], 339: [32, 42, 49, 62, 69, 63, 58, 60, 41, 37, 35, 35, 31, 20, 14, 16, 26, 19, 32, 44, 37, 38, 48, 50], 340: [31, 43, 46, 63, 83, 76, 37, 47, 22, 31, 27, 24, 25, 25, 28, 22, 24, 24, 22, 33, 27, 22, 41, 47], 341: [46, 74, 76, 84, 92, 87, 50, 65, 38, 56, 50, 39, 43, 29, 31, 31, 36, 39, 35, 54, 39, 46, 49, 69], 342: [51, 60, 71, 83, 80, 90, 66, 77, 57, 57, 54, 47, 49, 41, 21, 33, 34, 41, 38, 57, 53, 54, 58, 78], 343: [52, 62, 78, 96, 96, 92, 61, 80, 61, 70, 58, 55, 64, 50, 41, 32, 36, 47, 44, 72, 52, 44, 56, 66], 344: [62, 76, 92, 92, 89, 81, 86, 95, 80, 75, 70, 72, 48, 55, 27, 48, 34, 39, 56, 66, 75, 62, 75, 83], 345: [31, 49, 72, 92, 96, 95, 51, 77, 57, 63, 50, 46, 56, 39, 37, 29, 32, 34, 32, 61, 39, 33, 39, 55], 346: [16, 29, 31, 49, 63, 56, 31, 43, 20, 24, 14, 14, 16, 15, 15, 16, 24, 24, 14, 27, 15, 17, 18, 32], 347: [43, 50, 67, 83, 90, 88, 49, 49, 29, 34, 42, 33, 36, 29, 25, 36, 40, 43, 37, 46, 38, 43, 42, 56], 348: [21, 23, 30, 50, 52, 69, 34, 38, 24, 24, 21, 18, 20, 20, 21, 19, 25, 26, 21, 28, 18, 22, 28, 34], 349: [31, 37, 26, 58, 73, 71, 41, 52, 16, 24, 8, 41, 24, 31, 26, 20, 27, 26, 28, 27, 14, 36, 28, 32], 350: [46, 42, 52, 86, 79, 74, 44, 57, 36, 37, 43, 53, 55, 48, 41, 40, 41, 41, 35, 43, 24, 53, 54, 49], 351: [48, 58, 35, 54, 57, 42, 42, 45, 42, 37, 34, 37, 31, 33, 31, 35, 33, 52, 56, 58, 51, 54, 51, 50], 352: [51, 58, 58, 67, 62, 66, 53, 58, 53, 40, 41, 41, 30, 36, 44, 43, 45, 53, 62, 61, 54, 54, 53, 56], 353: [60, 75, 50, 73, 88, 84, 83, 69, 40, 56, 29, 62, 43, 60, 60, 28, 32, 44, 40, 56, 55, 38, 60, 65], 354: [53, 57, 56, 64, 71, 71, 53, 54, 44, 37, 39, 43, 27, 35, 39, 37, 44, 48, 56, 56, 51, 47, 52, 57], 355: [39, 47, 37, 41, 67, 47, 45, 48, 40, 36, 35, 32, 28, 29, 30, 35, 37, 51, 55, 56, 44, 52, 52, 50], 356: [37, 50, 40, 46, 59, 47, 46, 50, 44, 45, 40, 34, 31, 31, 34, 38, 38, 53, 57, 58, 49, 50, 51, 48], 357: [79, 72, 50, 70, 75, 94, 85, 78, 76, 53, 39, 48, 45, 45, 42, 46, 47, 53, 74, 57, 61, 70, 68, 72], 358: [55, 37, 38, 63, 60, 40, 33, 55, 57, 47, 34, 44, 33, 33, 31, 38, 41, 56, 62, 47, 54, 59, 57, 41], 359: [80, 71, 40, 80, 0, 0, 66, 74, 89, 45, 29, 40, 48, 26, 21, 39, 37, 38, 73, 64, 60, 64, 63, 60], 360: [73, 75, 93, 71, 100, 100, 82, 81, 89, 42, 24, 46, 48, 40, 45, 30, 40, 55, 56, 58, 74, 74, 71, 59], 361: [50, 48, 33, 76, 36, 36, 29, 47, 54, 38, 29, 44, 32, 24, 36, 29, 40, 45, 62, 48, 48, 52, 55, 45], 362: [52, 73, 63, 77, 57, 77, 89, 76, 75, 40, 48, 48, 46, 41, 50, 40, 34, 60, 57, 72, 55, 61, 64, 44], 363: [32, 36, 47, 61, 68, 71, 51, 52, 37, 31, 27, 31, 33, 25, 21, 29, 29, 35, 32, 39, 33, 40, 39, 45], 364: [47, 57, 63, 80, 82, 84, 76, 72, 52, 39, 33, 32, 30, 26, 21, 24, 29, 26, 32, 47, 43, 47, 46, 51], 365: [34, 40, 48, 65, 69, 71, 62, 62, 43, 27, 25, 24, 23, 24, 16, 19, 21, 22, 24, 31, 26, 35, 29, 38], 366: [48, 50, 74, 64, 95, 81, 82, 77, 60, 66, 36, 47, 51, 60, 16, 27, 27, 35, 32, 62, 58, 54, 30, 60], 367: [37, 35, 57, 66, 63, 100, 50, 50, 100, 33, 50, 30, 66, 50, 0, 50, 16, 0, 12, 50, 57, 75, 40, 66], 368: [53, 60, 60, 68, 74, 84, 76, 74, 63, 49, 48, 40, 47, 37, 30, 35, 32, 29, 43, 57, 51, 53, 57, 61], 369: [48, 65, 67, 69, 75, 87, 83, 77, 66, 53, 56, 47, 57, 47, 38, 42, 37, 39, 52, 57, 51, 55, 62, 60], 370: [39, 55, 52, 64, 72, 78, 70, 72, 57, 42, 43, 39, 47, 36, 31, 36, 36, 33, 35, 42, 38, 37, 48, 46], 371: [39, 49, 47, 61, 78, 80, 75, 70, 52, 46, 44, 38, 43, 34, 30, 32, 34, 34, 32, 41, 34, 31, 47, 53], 372: [42, 57, 58, 68, 71, 85, 72, 66, 42, 36, 35, 34, 40, 33, 27, 31, 38, 24, 35, 32, 31, 31, 45, 49], 373: [58, 69, 71, 70, 80, 82, 82, 84, 72, 59, 58, 58, 53, 36, 31, 29, 30, 29, 38, 58, 56, 56, 70, 72], 374: [67, 76, 79, 86, 88, 91, 86, 91, 79, 66, 67, 51, 46, 37, 26, 40, 30, 32, 42, 58, 65, 71, 78, 80], 375: [56, 68, 72, 75, 75, 89, 79, 85, 72, 57, 48, 34, 33, 29, 23, 29, 31, 32, 36, 57, 56, 59, 65, 72], 376: [53, 63, 63, 72, 74, 87, 77, 71, 65, 48, 47, 43, 53, 44, 37, 41, 37, 38, 48, 54, 55, 52, 57, 67], 377: [39, 48, 58, 73, 84, 76, 56, 55, 43, 34, 35, 34, 38, 36, 33, 34, 38, 41, 41, 40, 41, 41, 40, 44], 378: [77, 67, 72, 76, 57, 93, 92, 89, 65, 37, 46, 49, 48, 48, 54, 52, 43, 50, 57, 59, 58, 49, 70, 77], 379: [80, 84, 83, 76, 84, 95, 90, 93, 78, 36, 56, 44, 36, 50, 68, 70, 40, 71, 67, 55, 64, 76, 75, 89], 380: [69, 70, 69, 71, 75, 95, 83, 88, 65, 26, 26, 50, 44, 35, 53, 59, 37, 50, 58, 57, 55, 61, 66, 76], 381: [78, 84, 72, 84, 78, 97, 87, 87, 74, 51, 38, 56, 38, 46, 65, 64, 41, 68, 64, 74, 73, 66, 76, 86], 382: [81, 81, 84, 83, 75, 89, 91, 92, 77, 37, 21, 55, 58, 44, 49, 58, 42, 52, 59, 76, 66, 70, 71, 80], 383: [33, 43, 48, 47, 83, 83, 76, 85, 47, 41, 47, 15, 32, 36, 45, 44, 30, 36, 48, 60, 35, 44, 44, 51], 384: [36, 44, 49, 64, 84, 81, 62, 50, 33, 33, 36, 34, 37, 33, 31, 37, 38, 40, 45, 43, 40, 41, 35, 43], 385: [38, 45, 51, 67, 84, 84, 60, 51, 40, 34, 32, 34, 36, 33, 30, 32, 41, 39, 47, 45, 38, 40, 38, 43], 386: [35, 33, 42, 55, 67, 69, 53, 41, 28, 27, 21, 22, 27, 31, 24, 27, 34, 40, 35, 38, 32, 27, 34, 42], 387: [42, 47, 52, 63, 71, 79, 65, 52, 41, 38, 30, 38, 39, 38, 30, 39, 42, 43, 50, 51, 40, 40, 34, 41], 388: [67, 85, 74, 88, 77, 81, 84, 75, 63, 37, 33, 50, 52, 42, 32, 60, 42, 50, 78, 56, 50, 65, 65, 78], 389: [44, 50, 51, 61, 62, 79, 65, 56, 40, 39, 32, 40, 40, 38, 30, 36, 40, 42, 50, 53, 41, 43, 37, 45], 390: [77, 76, 75, 75, 71, 93, 79, 79, 54, 46, 33, 50, 49, 37, 50, 50, 52, 55, 59, 67, 60, 61, 61, 72], 391: [68, 70, 85, 92, 0, 0, 97, 89, 61, 23, 25, 60, 38, 46, 57, 50, 40, 58, 54, 82, 40, 35, 71, 93], 392: [76, 77, 70, 72, 77, 91, 79, 80, 51, 47, 32, 55, 48, 37, 42, 55, 45, 56, 63, 70, 58, 67, 62, 73], 393: [76, 79, 74, 79, 95, 91, 88, 90, 67, 42, 38, 54, 53, 38, 45, 62, 45, 57, 71, 68, 70, 73, 71, 84], 394: [44, 61, 40, 48, 68, 96, 66, 69, 48, 41, 26, 46, 32, 28, 32, 45, 38, 39, 54, 44, 43, 48, 46, 48], 395: [64, 79, 82, 75, 100, 100, 100, 91, 76, 63, 46, 57, 50, 46, 63, 57, 43, 46, 78, 59, 64, 72, 74, 82], 396: [52, 62, 63, 43, 70, 87, 75, 71, 50, 35, 21, 37, 30, 30, 32, 47, 45, 37, 46, 43, 36, 45, 42, 59], 397: [70, 62, 69, 74, 64, 85, 77, 72, 55, 47, 39, 46, 51, 42, 41, 44, 55, 53, 63, 69, 57, 54, 58, 65], 398: [65, 68, 65, 69, 69, 75, 76, 66, 51, 49, 43, 49, 49, 42, 45, 47, 52, 52, 66, 72, 60, 57, 63, 67], 399: [71, 76, 81, 69, 63, 85, 100, 73, 80, 59, 41, 52, 39, 42, 44, 49, 48, 61, 68, 84, 71, 58, 69, 71], 400: [63, 60, 45, 48, 87, 88, 88, 76, 67, 45, 32, 55, 48, 50, 41, 53, 51, 45, 57, 59, 61, 46, 55, 45], 401: [76, 75, 75, 71, 100, 100, 57, 77, 64, 61, 38, 46, 65, 48, 29, 48, 35, 56, 46, 53, 66, 54, 58, 68], 402: [62, 62, 62, 71, 69, 81, 84, 66, 51, 46, 45, 45, 48, 45, 42, 46, 47, 51, 63, 71, 58, 53, 62, 65], 403: [71, 50, 85, 90, 75, 50, 75, 57, 73, 81, 50, 71, 60, 43, 56, 40, 58, 50, 77, 80, 70, 70, 71, 81], 404: [60, 61, 62, 67, 76, 91, 82, 69, 56, 50, 46, 47, 51, 47, 46, 45, 47, 54, 68, 68, 63, 53, 58, 70], 405: [63, 52, 59, 58, 94, 90, 84, 65, 56, 49, 50, 57, 51, 49, 56, 58, 48, 60, 73, 81, 78, 73, 68, 63], 406: [61, 68, 60, 78, 83, 93, 83, 77, 62, 56, 49, 50, 58, 53, 53, 49, 49, 59, 74, 73, 63, 62, 65, 76], 407: [66, 82, 67, 81, 75, 91, 85, 82, 68, 60, 52, 56, 59, 61, 51, 57, 53, 62, 82, 79, 63, 72, 72, 78], 408: [77, 76, 75, 81, 75, 96, 81, 76, 77, 65, 56, 56, 62, 59, 49, 55, 54, 63, 72, 80, 65, 63, 72, 76], 409: [69, 80, 78, 83, 82, 93, 85, 85, 69, 63, 46, 52, 59, 56, 58, 56, 50, 58, 75, 76, 62, 76, 73, 84], 410: [72, 60, 55, 60, 75, 66, 88, 80, 88, 57, 72, 23, 50, 55, 37, 38, 21, 66, 68, 70, 60, 61, 65, 56], 411: [0, 0, 50, 0, 0, 0, 0, 100, 0, 0, 0, 0, 75, 50, 100, 0, 0, 0, 100, 100, 0, 0, 0, 100], 412: [0, 100, 100, 50, 100, 0, 100, 85, 100, 0, 40, 50, 33, 62, 50, 33, 44, 50, 100, 100, 0, 20, 0, 100], 413: [50, 52, 46, 60, 70, 83, 87, 83, 78, 59, 50, 52, 52, 29, 33, 35, 33, 30, 53, 55, 43, 60, 52, 67], 414: [51, 54, 63, 74, 83, 80, 71, 66, 57, 43, 31, 27, 21, 22, 16, 23, 36, 27, 29, 36, 32, 43, 50, 54], 415: [57, 60, 67, 80, 86, 85, 77, 79, 65, 44, 39, 39, 30, 32, 31, 21, 41, 27, 43, 50, 40, 45, 53, 68], 416: [58, 57, 66, 77, 86, 86, 75, 77, 65, 42, 39, 39, 33, 37, 32, 24, 37, 31, 41, 43, 37, 49, 53, 62], 417: [51, 52, 57, 67, 67, 77, 68, 64, 49, 31, 34, 28, 29, 24, 23, 27, 33, 28, 36, 41, 40, 45, 47, 54], 418: [24, 36, 32, 37, 56, 43, 50, 51, 45, 38, 39, 35, 36, 30, 33, 32, 40, 41, 54, 54, 45, 42, 38, 39], 419: [47, 47, 44, 45, 65, 85, 84, 80, 69, 54, 48, 57, 40, 37, 40, 36, 41, 42, 47, 59, 39, 52, 57, 48], 420: [44, 55, 60, 52, 73, 79, 90, 85, 83, 69, 60, 66, 62, 53, 33, 42, 41, 47, 51, 52, 51, 67, 66, 74], 421: [45, 54, 49, 44, 61, 68, 64, 64, 57, 45, 42, 40, 44, 34, 31, 38, 40, 44, 54, 62, 43, 50, 50, 51], 422: [41, 50, 42, 50, 61, 68, 68, 57, 51, 41, 35, 35, 36, 31, 28, 32, 34, 41, 49, 56, 38, 49, 46, 44], 423: [56, 56, 64, 51, 76, 84, 82, 79, 76, 59, 46, 45, 38, 35, 33, 31, 40, 34, 44, 60, 40, 53, 55, 58], 424: [60, 66, 70, 72, 80, 97, 82, 87, 79, 56, 46, 43, 29, 31, 30, 26, 46, 35, 38, 50, 40, 56, 58, 69], 425: [63, 62, 66, 73, 81, 95, 82, 81, 75, 61, 38, 49, 36, 33, 22, 38, 43, 40, 30, 52, 41, 53, 61, 71], 426: [60, 62, 70, 74, 69, 87, 72, 74, 69, 50, 31, 37, 26, 28, 17, 30, 35, 27, 29, 46, 32, 50, 52, 65], 427: [69, 56, 75, 76, 83, 92, 85, 91, 84, 62, 52, 40, 66, 23, 25, 10, 34, 42, 27, 50, 41, 42, 56, 52], 428: [62, 61, 69, 79, 83, 85, 93, 85, 70, 25, 44, 47, 42, 42, 16, 20, 33, 47, 36, 37, 35, 57, 50, 59], 429: [77, 85, 78, 82, 95, 98, 93, 87, 77, 36, 44, 69, 54, 50, 42, 40, 46, 52, 50, 35, 44, 46, 78, 65], 430: [66, 71, 96, 63, 100, 100, 100, 84, 81, 56, 45, 80, 25, 50, 40, 33, 55, 70, 76, 60, 47, 64, 70, 91], 431: [65, 75, 80, 84, 91, 97, 96, 90, 76, 57, 48, 59, 59, 61, 31, 41, 31, 46, 47, 44, 20, 62, 75, 82], 432: [62, 67, 71, 71, 79, 95, 88, 86, 80, 63, 41, 43, 32, 40, 30, 26, 41, 36, 45, 58, 39, 56, 74, 75], 433: [58, 64, 66, 82, 87, 90, 86, 83, 74, 54, 40, 39, 29, 31, 26, 26, 38, 31, 48, 55, 47, 47, 64, 69], 434: [49, 50, 51, 64, 67, 78, 64, 60, 47, 30, 34, 34, 32, 24, 28, 31, 30, 33, 40, 45, 42, 43, 47, 49], 435: [33, 39, 32, 50, 48, 54, 54, 48, 35, 28, 31, 28, 31, 24, 28, 31, 37, 37, 46, 48, 35, 43, 41, 45], 436: [54, 54, 51, 57, 58, 63, 65, 59, 46, 30, 38, 38, 34, 29, 32, 35, 33, 39, 46, 46, 46, 47, 53, 51], 437: [52, 59, 55, 63, 62, 57, 41, 48, 32, 28, 33, 36, 36, 31, 31, 35, 34, 40, 49, 47, 47, 43, 49, 55], 438: [38, 47, 59, 71, 64, 68, 67, 66, 58, 51, 55, 45, 46, 30, 19, 21, 20, 17, 38, 51, 41, 43, 54, 53], 439: [40, 50, 58, 68, 62, 73, 67, 69, 59, 50, 53, 35, 41, 23, 14, 20, 20, 17, 35, 50, 41, 40, 53, 53], 440: [34, 49, 50, 63, 66, 66, 68, 76, 56, 47, 40, 30, 32, 20, 21, 13, 18, 18, 33, 44, 33, 37, 40, 46], 441: [37, 43, 57, 65, 68, 63, 60, 68, 51, 44, 46, 36, 29, 20, 13, 19, 20, 20, 27, 42, 35, 43, 47, 48], 442: [33, 42, 56, 64, 67, 70, 53, 60, 48, 47, 39, 32, 32, 21, 18, 20, 28, 22, 28, 37, 35, 40, 44, 49], 443: [44, 50, 60, 62, 65, 77, 54, 56, 34, 33, 25, 24, 20, 19, 14, 19, 28, 21, 25, 36, 33, 36, 38, 51], 444: [41, 43, 57, 69, 69, 76, 51, 58, 32, 34, 31, 25, 23, 15, 20, 26, 28, 23, 25, 35, 35, 38, 44, 47], 445: [50, 57, 66, 71, 78, 80, 58, 69, 57, 36, 32, 32, 40, 18, 23, 34, 36, 36, 35, 42, 44, 48, 57, 59], 446: [48, 54, 64, 74, 80, 74, 70, 74, 42, 34, 33, 30, 39, 22, 19, 29, 33, 34, 39, 42, 40, 51, 57, 55], 447: [37, 37, 43, 72, 78, 78, 61, 55, 38, 29, 31, 26, 34, 20, 17, 26, 37, 32, 32, 28, 25, 39, 36, 43], 448: [36, 41, 42, 73, 79, 78, 66, 64, 32, 24, 30, 19, 24, 18, 19, 27, 28, 25, 27, 24, 23, 31, 30, 41], 449: [40, 47, 47, 56, 73, 79, 74, 73, 45, 31, 30, 24, 18, 29, 24, 29, 25, 30, 38, 34, 30, 42, 44, 47], 450: [37, 40, 39, 50, 71, 72, 53, 59, 27, 25, 21, 16, 23, 21, 23, 19, 26, 30, 36, 27, 27, 31, 37, 39], 451: [39, 40, 28, 42, 40, 60, 50, 67, 35, 34, 29, 19, 16, 24, 17, 16, 20, 26, 38, 30, 20, 32, 41, 31], 452: [39, 42, 32, 41, 26, 57, 53, 66, 33, 37, 27, 22, 17, 35, 19, 18, 23, 32, 37, 28, 24, 43, 42, 29], 453: [37, 48, 60, 69, 72, 72, 45, 54, 36, 29, 28, 28, 24, 22, 18, 16, 14, 19, 22, 31, 25, 25, 42, 47], 454: [39, 57, 64, 75, 74, 79, 48, 65, 46, 40, 33, 28, 30, 19, 15, 17, 17, 20, 24, 35, 31, 30, 47, 60], 455: [18, 30, 44, 55, 55, 64, 36, 42, 42, 33, 32, 39, 30, 23, 21, 19, 12, 15, 18, 33, 28, 16, 31, 24], 456: [51, 69, 78, 78, 80, 79, 73, 83, 79, 74, 61, 36, 31, 27, 20, 18, 16, 17, 32, 52, 43, 49, 65, 79], 457: [50, 61, 71, 75, 82, 85, 70, 78, 75, 65, 55, 32, 35, 25, 20, 19, 13, 19, 31, 51, 45, 49, 60, 72], 458: [41, 55, 64, 73, 80, 67, 71, 76, 57, 54, 52, 32, 38, 19, 17, 13, 13, 17, 32, 45, 39, 39, 51, 56], 459: [23, 32, 33, 50, 63, 63, 21, 30, 28, 28, 21, 20, 19, 15, 16, 15, 18, 12, 22, 28, 24, 27, 29, 32], 460: [26, 33, 46, 60, 67, 62, 38, 38, 29, 29, 30, 21, 24, 16, 10, 16, 21, 17, 23, 29, 26, 29, 30, 35], 461: [47, 57, 55, 52, 75, 89, 61, 76, 64, 63, 60, 40, 23, 47, 40, 42, 21, 18, 55, 48, 56, 53, 57, 51], 462: [27, 34, 48, 61, 67, 61, 42, 46, 23, 26, 28, 25, 21, 16, 10, 16, 23, 14, 25, 32, 24, 26, 30, 35], 463: [36, 35, 48, 68, 81, 78, 40, 41, 22, 20, 19, 21, 19, 17, 12, 16, 22, 19, 27, 31, 25, 33, 40, 47], 464: [36, 39, 59, 81, 90, 90, 46, 47, 20, 25, 22, 23, 22, 12, 13, 19, 32, 30, 26, 32, 23, 32, 37, 46], 465: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 466: [70, 63, 78, 78, 85, 70, 79, 82, 35, 34, 30, 23, 45, 31, 9, 21, 44, 21, 47, 37, 55, 53, 64, 71], 467: [62, 57, 61, 68, 75, 90, 75, 80, 63, 62, 59, 33, 50, 42, 44, 53, 37, 48, 50, 51, 60, 37, 68, 72], 468: [66, 55, 61, 100, 80, 83, 100, 93, 84, 61, 33, 14, 40, 46, 60, 57, 50, 62, 40, 50, 61, 72, 76, 53], 469: [53, 61, 25, 72, 50, 83, 71, 92, 85, 60, 25, 40, 57, 35, 37, 33, 23, 58, 33, 68, 69, 42, 43, 60], 470: [54, 49, 61, 62, 67, 74, 66, 63, 33, 27, 22, 26, 30, 21, 28, 30, 35, 36, 38, 43, 33, 44, 48, 52], 471: [50, 39, 51, 58, 63, 73, 55, 57, 34, 34, 26, 24, 34, 19, 25, 30, 38, 35, 39, 36, 34, 44, 46, 46], 472: [65, 69, 73, 68, 75, 92, 70, 74, 53, 52, 28, 48, 42, 30, 36, 46, 48, 42, 45, 52, 60, 53, 62, 65], 473: [59, 43, 61, 65, 77, 87, 71, 63, 40, 40, 38, 37, 39, 29, 40, 45, 47, 49, 56, 51, 45, 54, 55, 58], 474: [59, 50, 60, 67, 79, 77, 73, 56, 36, 37, 34, 34, 38, 34, 37, 43, 49, 52, 56, 55, 47, 50, 56, 59], 475: [54, 53, 58, 60, 76, 77, 67, 76, 70, 54, 44, 33, 31, 21, 23, 36, 38, 30, 41, 36, 33, 42, 52, 54], 476: [55, 53, 47, 80, 65, 57, 58, 61, 53, 39, 39, 42, 33, 24, 33, 35, 32, 45, 58, 57, 49, 56, 57, 51], 477: [47, 52, 51, 52, 63, 53, 48, 46, 46, 35, 29, 29, 24, 17, 26, 26, 33, 44, 47, 50, 38, 43, 47, 38], 478: [33, 35, 33, 35, 57, 48, 40, 41, 37, 36, 34, 32, 29, 27, 27, 34, 35, 46, 49, 48, 41, 45, 44, 39], 479: [42, 51, 50, 52, 65, 70, 56, 49, 54, 37, 37, 45, 34, 34, 26, 37, 38, 38, 49, 51, 47, 51, 51, 34], 480: [29, 50, 34, 42, 70, 40, 49, 38, 36, 36, 37, 35, 32, 32, 33, 31, 40, 44, 52, 51, 43, 40, 37, 41], 481: [34, 52, 35, 55, 80, 66, 77, 76, 62, 52, 41, 52, 54, 33, 42, 20, 49, 43, 50, 36, 49, 50, 42, 59], 482: [38, 49, 50, 60, 75, 75, 83, 70, 62, 42, 56, 47, 53, 28, 51, 31, 27, 38, 59, 43, 14, 60, 41, 60], 483: [44, 48, 66, 64, 58, 87, 84, 69, 66, 56, 50, 60, 51, 46, 37, 37, 24, 41, 51, 52, 42, 60, 51, 60], 484: [44, 52, 53, 66, 73, 74, 70, 60, 58, 44, 36, 38, 36, 32, 32, 32, 37, 36, 44, 49, 41, 45, 47, 44], 485: [47, 61, 51, 62, 78, 70, 64, 48, 48, 40, 32, 30, 52, 40, 41, 37, 27, 52, 51, 64, 44, 40, 64, 53], 486: [47, 52, 58, 67, 74, 73, 64, 61, 56, 43, 37, 38, 34, 27, 31, 33, 33, 39, 41, 49, 44, 42, 46, 48], 487: [43, 45, 56, 62, 70, 73, 57, 52, 51, 44, 39, 36, 39, 35, 30, 33, 33, 38, 44, 43, 41, 38, 40, 52], 488: [46, 59, 70, 84, 85, 87, 77, 69, 66, 54, 46, 46, 45, 43, 32, 34, 36, 38, 41, 59, 47, 50, 50, 57], 489: [38, 46, 66, 77, 82, 76, 58, 47, 46, 44, 38, 35, 37, 26, 24, 34, 34, 35, 35, 43, 36, 40, 40, 51], 490: [34, 39, 47, 60, 68, 76, 64, 57, 53, 38, 33, 24, 27, 18, 24, 18, 21, 20, 27, 31, 24, 28, 36, 39], 491: [33, 37, 53, 67, 76, 75, 48, 44, 40, 36, 31, 29, 32, 25, 24, 31, 32, 31, 29, 31, 32, 36, 34, 45], 492: [40, 48, 44, 60, 58, 73, 70, 63, 53, 36, 25, 31, 30, 26, 17, 22, 31, 28, 30, 32, 25, 33, 46, 48], 493: [42, 44, 60, 55, 72, 60, 75, 75, 55, 43, 35, 35, 41, 39, 22, 29, 38, 34, 55, 42, 44, 62, 52, 49], 494: [52, 49, 58, 66, 86, 78, 77, 77, 55, 29, 34, 36, 26, 20, 27, 36, 37, 40, 52, 34, 41, 44, 50, 49], 495: [34, 28, 47, 82, 50, 35, 41, 38, 28, 21, 32, 27, 31, 29, 30, 30, 35, 37, 42, 42, 35, 40, 31, 33], 496: [45, 55, 64, 61, 80, 65, 63, 58, 37, 28, 34, 26, 25, 28, 23, 30, 41, 44, 37, 32, 40, 40, 34, 32], 497: [54, 50, 58, 62, 83, 80, 73, 83, 71, 44, 42, 31, 36, 27, 27, 30, 35, 43, 47, 41, 45, 46, 51, 51], 498: [38, 55, 44, 70, 68, 67, 51, 57, 45, 28, 32, 19, 25, 29, 25, 26, 32, 40, 28, 34, 33, 25, 32, 34], 499: [33, 31, 39, 27, 71, 27, 48, 39, 34, 23, 33, 30, 29, 30, 26, 23, 33, 44, 42, 42, 35, 33, 32, 34], 500: [69, 72, 66, 75, 80, 79, 63, 72, 50, 45, 33, 54, 58, 63, 43, 37, 56, 46, 63, 85, 59, 79, 75, 81], 501: [56, 64, 62, 64, 63, 73, 53, 63, 46, 38, 37, 45, 37, 41, 35, 33, 46, 50, 57, 67, 60, 69, 62, 69], 502: [69, 61, 89, 76, 100, 100, 90, 78, 37, 59, 45, 68, 64, 66, 56, 62, 86, 54, 59, 85, 91, 86, 83, 85], 503: [0, 66, 0, 0, 100, 0, 0, 0, 50, 100, 0, 33, 100, 0, 100, 20, 0, 100, 100, 0, 0, 90, 100, 100], 504: [61, 65, 66, 63, 73, 75, 53, 61, 48, 44, 40, 52, 39, 45, 36, 37, 47, 52, 60, 68, 63, 68, 70, 68], 505: [88, 91, 76, 80, 100, 100, 100, 61, 71, 66, 60, 63, 68, 45, 60, 62, 46, 51, 82, 58, 75, 100, 96, 62], 506: [60, 68, 68, 67, 75, 75, 57, 59, 47, 41, 40, 47, 41, 41, 34, 34, 49, 49, 58, 65, 65, 68, 66, 72], 507: [73, 66, 90, 100, 66, 66, 50, 64, 38, 52, 71, 69, 60, 60, 64, 51, 64, 46, 65, 80, 60, 61, 91, 75], 508: [82, 58, 71, 100, 100, 0, 100, 75, 26, 48, 64, 70, 63, 42, 86, 32, 78, 73, 64, 88, 61, 70, 89, 90], 509: [65, 67, 70, 67, 84, 74, 58, 61, 50, 44, 39, 48, 40, 41, 41, 37, 50, 55, 64, 67, 63, 69, 64, 76], 510: [60, 100, 100, 100, 0, 100, 60, 66, 58, 64, 70, 58, 50, 80, 68, 66, 80, 66, 93, 87, 66, 81, 90, 60], 511: [100, 100, 0, 100, 0, 0, 0, 0, 0, 100, 0, 50, 80, 100, 100, 100, 100, 100, 83, 100, 100, 66, 100, 100], 512: [69, 92, 100, 87, 40, 100, 66, 75, 73, 41, 46, 85, 66, 63, 53, 60, 70, 77, 93, 100, 94, 75, 76, 100], 513: [79, 81, 83, 96, 68, 85, 91, 76, 77, 62, 63, 71, 76, 63, 70, 59, 61, 79, 88, 89, 83, 80, 88, 91], 514: [40, 50, 100, 0, 0, 0, 0, 0, 75, 0, 25, 33, 0, 100, 100, 100, 100, 100, 100, 100, 66, 40, 37, 100], 515: [66, 62, 70, 74, 78, 83, 63, 70, 61, 52, 42, 36, 39, 46, 52, 64, 58, 53, 68, 71, 57, 64, 58, 65], 516: [51, 57, 72, 54, 37, 66, 73, 63, 54, 28, 41, 42, 22, 28, 78, 71, 62, 35, 57, 76, 62, 60, 58, 64], 517: [58, 56, 70, 66, 57, 50, 40, 65, 57, 29, 23, 53, 15, 27, 63, 90, 33, 50, 58, 85, 80, 64, 69, 75], 518: [70, 75, 100, 100, 0, 0, 50, 100, 73, 54, 70, 37, 22, 16, 87, 50, 14, 55, 56, 85, 60, 50, 50, 100], 519: [58, 56, 71, 51, 52, 0, 53, 66, 46, 27, 30, 44, 24, 7, 67, 42, 47, 56, 53, 82, 67, 64, 61, 65], 520: [53, 60, 52, 55, 61, 78, 70, 64, 63, 48, 44, 47, 47, 46, 34, 42, 41, 44, 62, 59, 57, 50, 60, 48], 521: [74, 71, 63, 67, 69, 88, 88, 83, 79, 70, 52, 64, 60, 61, 61, 46, 44, 49, 71, 69, 67, 68, 66, 69], 522: [46, 54, 43, 71, 83, 77, 78, 77, 71, 59, 39, 50, 46, 63, 52, 25, 50, 36, 64, 67, 64, 42, 50, 67], 523: [51, 61, 55, 57, 70, 74, 64, 55, 43, 36, 42, 43, 36, 39, 38, 34, 34, 39, 46, 53, 52, 52, 54, 60], 524: [52, 50, 28, 42, 25, 100, 52, 47, 35, 50, 60, 62, 35, 43, 41, 35, 30, 44, 46, 47, 53, 58, 56, 68], 525: [60, 63, 60, 59, 70, 71, 63, 47, 46, 34, 40, 47, 37, 40, 38, 38, 34, 42, 50, 53, 58, 57, 59, 62], 526: [55, 31, 42, 37, 28, 66, 37, 31, 36, 42, 35, 48, 36, 47, 37, 63, 39, 40, 52, 48, 73, 45, 46, 66], 527: [25, 0, 0, 100, 100, 0, 40, 25, 33, 100, 60, 66, 50, 100, 60, 66, 0, 36, 46, 40, 83, 50, 33, 66], 528: [50, 40, 20, 37, 42, 83, 53, 33, 34, 40, 41, 44, 32, 62, 57, 64, 27, 51, 84, 28, 63, 37, 51, 56], 529: [59, 65, 61, 60, 67, 73, 66, 49, 43, 41, 41, 44, 40, 40, 41, 39, 32, 49, 48, 53, 62, 61, 59, 61], 530: [50, 52, 60, 75, 100, 50, 42, 47, 44, 33, 34, 42, 40, 45, 37, 35, 38, 53, 61, 50, 54, 60, 63, 60], 531: [37, 44, 56, 53, 82, 42, 42, 47, 45, 33, 34, 41, 36, 43, 35, 32, 36, 53, 56, 50, 42, 58, 63, 47], 532: [63, 67, 60, 65, 67, 75, 69, 52, 53, 42, 43, 52, 45, 48, 42, 42, 37, 48, 55, 60, 68, 66, 67, 67], 533: [87, 86, 84, 67, 78, 95, 93, 70, 59, 48, 52, 48, 55, 49, 51, 48, 43, 54, 69, 66, 78, 74, 80, 85], 534: [69, 67, 46, 57, 63, 46, 53, 52, 42, 35, 34, 34, 32, 34, 33, 35, 34, 52, 60, 60, 52, 50, 53, 58], 535: [59, 59, 40, 55, 60, 92, 87, 70, 72, 57, 57, 52, 54, 63, 42, 54, 38, 58, 68, 72, 72, 61, 66, 66], 536: [67, 59, 64, 56, 41, 50, 48, 59, 52, 38, 39, 37, 39, 35, 35, 30, 30, 50, 60, 58, 47, 54, 50, 58], 537: [58, 50, 27, 36, 77, 67, 72, 75, 71, 61, 73, 66, 69, 70, 65, 61, 48, 62, 68, 72, 72, 74, 72, 70], 538: [65, 63, 56, 46, 52, 74, 55, 67, 52, 48, 45, 51, 52, 51, 44, 53, 45, 59, 64, 78, 66, 65, 66, 64], 539: [68, 73, 38, 40, 50, 100, 73, 81, 61, 55, 48, 58, 53, 52, 48, 58, 40, 64, 70, 83, 72, 67, 70, 63], 540: [70, 66, 58, 55, 71, 50, 66, 76, 69, 65, 69, 56, 65, 58, 48, 60, 67, 65, 68, 77, 60, 59, 53, 70], 541: [66, 80, 56, 76, 51, 76, 75, 85, 68, 57, 48, 54, 58, 56, 44, 57, 41, 70, 80, 87, 72, 72, 71, 74], 542: [63, 75, 74, 72, 41, 100, 57, 81, 78, 44, 80, 66, 55, 70, 60, 65, 75, 76, 80, 76, 71, 64, 80, 72], 543: [83, 75, 76, 66, 100, 100, 100, 66, 53, 62, 54, 38, 77, 50, 70, 70, 61, 84, 90, 94, 84, 71, 80, 94], 544: [88, 86, 90, 76, 100, 92, 80, 67, 65, 47, 63, 38, 76, 62, 64, 73, 48, 74, 88, 88, 82, 79, 89, 93], 545: [97, 93, 89, 80, 100, 77, 97, 88, 84, 61, 76, 80, 86, 71, 77, 45, 41, 74, 84, 90, 88, 90, 92, 91], 546: [78, 89, 97, 92, 100, 88, 100, 84, 62, 55, 30, 73, 73, 54, 53, 77, 70, 65, 96, 72, 80, 69, 87, 94], 547: [84, 85, 82, 73, 93, 95, 95, 87, 76, 87, 61, 69, 76, 73, 78, 35, 50, 80, 77, 90, 93, 91, 77, 81], 548: [80, 81, 74, 66, 96, 83, 76, 72, 79, 66, 69, 56, 80, 58, 55, 50, 53, 70, 70, 84, 88, 75, 68, 77], 549: [68, 58, 75, 0, 0, 100, 100, 100, 100, 100, 33, 50, 50, 33, 80, 50, 50, 100, 0, 75, 100, 100, 86, 86], 550: [70, 72, 61, 75, 79, 71, 68, 87, 76, 62, 65, 61, 63, 59, 38, 62, 54, 48, 68, 74, 65, 70, 68, 75], 551: [81, 87, 90, 89, 89, 86, 83, 70, 69, 61, 55, 57, 68, 60, 56, 57, 37, 50, 69, 80, 78, 72, 78, 84], 552: [60, 83, 96, 83, 100, 100, 40, 66, 85, 47, 72, 40, 71, 52, 76, 58, 41, 75, 59, 86, 79, 72, 60, 75], 553: [84, 89, 92, 91, 91, 91, 86, 70, 70, 65, 59, 60, 67, 66, 57, 67, 46, 58, 74, 85, 78, 79, 81, 90], 554: [90, 90, 91, 96, 92, 84, 87, 75, 100, 88, 73, 71, 77, 64, 69, 76, 5, 78, 77, 93, 79, 86, 86, 91], 555: [92, 88, 91, 95, 93, 85, 83, 84, 79, 77, 73, 59, 70, 68, 63, 72, 40, 63, 80, 93, 75, 81, 82, 94], 556: [100, 96, 100, 83, 100, 0, 100, 100, 50, 100, 100, 0, 100, 84, 42, 60, 80, 45, 85, 85, 69, 100, 84, 95], 557: [82, 87, 95, 88, 87, 92, 94, 62, 68, 62, 46, 49, 77, 71, 61, 62, 63, 61, 64, 77, 87, 70, 87, 88], 558: [68, 50, 96, 58, 25, 85, 90, 68, 69, 63, 47, 45, 90, 52, 53, 59, 65, 71, 57, 75, 89, 73, 90, 85], 559: [53, 100, 100, 77, 0, 100, 0, 0, 0, 66, 28, 37, 70, 100, 75, 50, 50, 25, 100, 77, 50, 66, 87, 100], 560: [94, 85, 100, 100, 100, 100, 100, 50, 100, 100, 75, 85, 47, 100, 90, 44, 0, 100, 60, 100, 92, 94, 93, 89], 561: [93, 91, 91, 96, 91, 86, 86, 85, 100, 91, 77, 76, 84, 71, 59, 76, 8, 76, 92, 100, 79, 89, 88, 92], 562: [65, 84, 91, 90, 100, 100, 40, 62, 100, 37, 76, 46, 69, 64, 66, 75, 50, 64, 56, 88, 86, 73, 65, 80], 563: [78, 100, 80, 100, 0, 50, 100, 100, 0, 100, 0, 0, 66, 50, 100, 100, 0, 100, 100, 50, 66, 87, 100, 100], 564: [100, 75, 100, 100, 0, 0, 100, 0, 100, 0, 100, 0, 100, 100, 0, 100, 0, 0, 0, 100, 100, 0, 100, 100], 565: [66, 100, 100, 50, 0, 100, 100, 0, 0, 100, 20, 66, 100, 0, 33, 0, 0, 0, 100, 100, 62, 100, 100, 100], 566: [75, 85, 91, 86, 100, 100, 66, 57, 100, 75, 88, 53, 60, 76, 100, 84, 28, 70, 40, 95, 89, 83, 60, 66], 567: [94, 100, 84, 100, 100, 100, 100, 100, 100, 100, 81, 77, 75, 66, 100, 100, 0, 0, 100, 100, 100, 100, 88, 66], 568: [88, 92, 86, 93, 100, 50, 100, 100, 100, 100, 64, 100, 88, 85, 100, 100, 100, 0, 100, 100, 100, 94, 90, 100], 569: [0, 100, 100, 100, 0, 100, 0, 100, 0, 100, 15, 100, 100, 75, 0, 100, 0, 0, 0, 100, 100, 100, 100, 100], 570: [100, 100, 100, 0, 0, 100, 0, 0, 0, 100, 30, 0, 100, 0, 0, 0, 0, 0, 0, 100, 87, 0, 100, 100], 571: [93, 85, 100, 60, 0, 0, 100, 100, 100, 100, 100, 100, 62, 75, 0, 100, 50, 0, 100, 100, 93, 100, 86, 100], 572: [100, 100, 100, 100, 0, 100, 100, 66, 66, 0, 0, 0, 0, 100, 0, 100, 85, 0, 66, 100, 100, 100, 100, 0], 573: [0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 100, 0], 574: [100, 0, 100, 0, 0, 100, 0, 0, 0, 0, 66, 0, 0, 0, 0, 0, 100, 100, 50, 100, 0, 0, 0, 100], 575: [100, 100, 100, 100, 0, 100, 100, 66, 83, 0, 0, 0, 0, 100, 0, 100, 85, 0, 75, 100, 100, 100, 100, 0], 576: [83, 100, 86, 80, 100, 83, 66, 66, 50, 46, 38, 50, 100, 75, 15, 80, 93, 62, 86, 66, 89, 61, 70, 84], 577: [81, 87, 89, 77, 100, 86, 57, 70, 65, 47, 40, 29, 84, 78, 28, 71, 78, 74, 63, 71, 87, 57, 80, 81], 578: [25, 26, 31, 61, 75, 71, 58, 45, 23, 22, 26, 34, 30, 21, 25, 34, 36, 33, 32, 30, 21, 34, 28, 43], 579: [29, 26, 38, 64, 84, 85, 67, 62, 25, 33, 26, 36, 38, 29, 28, 26, 35, 27, 24, 40, 18, 40, 31, 34], 580: [63, 71, 73, 74, 93, 74, 58, 65, 49, 43, 43, 50, 42, 46, 35, 38, 49, 52, 64, 64, 68, 68, 62, 73], 581: [71, 100, 30, 100, 71, 92, 50, 85, 50, 38, 41, 52, 65, 20, 68, 30, 100, 30, 66, 72, 70, 81, 66, 95], 582: [48, 64, 69, 81, 84, 85, 82, 76, 56, 49, 45, 40, 46, 39, 33, 33, 37, 34, 30, 44, 45, 42, 57, 61], 583: [55, 62, 58, 80, 16, 60, 14, 29, 36, 43, 25, 27, 35, 26, 50, 37, 19, 19, 33, 59, 53, 41, 53, 61], 584: [74, 88, 90, 94, 86, 100, 100, 83, 84, 53, 40, 51, 30, 39, 24, 33, 17, 27, 32, 58, 65, 54, 78, 85], 585: [50, 63, 62, 74, 62, 70, 31, 26, 30, 44, 28, 28, 23, 23, 11, 4, 12, 24, 16, 26, 36, 38, 60, 68], 586: [33, 21, 39, 50, 52, 53, 54, 44, 20, 24, 25, 19, 32, 26, 26, 29, 27, 31, 26, 27, 27, 25, 35, 36], 587: [34, 40, 46, 72, 77, 72, 61, 39, 18, 21, 27, 29, 36, 24, 34, 40, 43, 41, 41, 32, 26, 23, 38, 56], 588: [33, 31, 28, 56, 63, 72, 65, 43, 14, 20, 26, 24, 30, 20, 28, 32, 29, 30, 27, 25, 18, 30, 32, 37], 589: [25, 18, 30, 36, 41, 67, 61, 39, 17, 22, 14, 17, 24, 22, 23, 23, 19, 27, 17, 27, 21, 26, 17, 19], 590: [52, 36, 44, 66, 100, 42, 77, 77, 26, 41, 42, 40, 68, 38, 40, 44, 40, 35, 41, 47, 31, 41, 37, 80], 591: [35, 57, 72, 77, 87, 81, 90, 73, 41, 37, 53, 55, 47, 70, 48, 48, 52, 67, 37, 46, 45, 63, 46, 64], 592: [56, 50, 66, 70, 86, 70, 88, 83, 40, 38, 47, 43, 61, 51, 49, 48, 46, 49, 52, 51, 46, 61, 55, 65], 593: [30, 19, 30, 32, 38, 71, 54, 52, 26, 21, 16, 16, 25, 24, 22, 23, 26, 30, 20, 26, 20, 28, 23, 30], 594: [85, 85, 66, 76, 84, 85, 91, 74, 76, 67, 53, 47, 63, 65, 55, 38, 52, 78, 82, 69, 54, 62, 58, 76], 595: [72, 76, 79, 84, 85, 95, 91, 88, 76, 65, 75, 57, 62, 56, 48, 50, 54, 51, 51, 77, 65, 72, 75, 80], 596: [73, 81, 80, 91, 88, 94, 96, 92, 86, 77, 75, 53, 67, 68, 47, 42, 53, 57, 57, 75, 63, 70, 86, 80], 597: [61, 70, 67, 75, 86, 88, 87, 88, 77, 62, 71, 48, 60, 56, 45, 46, 48, 48, 45, 58, 56, 55, 71, 67], 598: [69, 79, 78, 78, 87, 92, 91, 89, 75, 70, 72, 50, 58, 53, 52, 47, 43, 44, 46, 62, 49, 64, 76, 70], 599: [27, 34, 47, 68, 80, 78, 46, 53, 29, 30, 29, 20, 31, 29, 23, 28, 35, 32, 36, 25, 26, 27, 30, 36], 600: [47, 59, 65, 84, 92, 88, 85, 80, 53, 56, 58, 31, 50, 41, 42, 36, 44, 44, 33, 50, 41, 50, 51, 53], 601: [32, 37, 60, 58, 85, 71, 57, 61, 20, 38, 33, 20, 34, 29, 31, 32, 32, 34, 34, 28, 25, 34, 36, 40], 602: [28, 38, 51, 76, 80, 75, 54, 57, 27, 29, 22, 27, 25, 24, 21, 25, 32, 33, 27, 43, 23, 30, 31, 37], 603: [33, 39, 36, 57, 63, 65, 50, 58, 23, 29, 39, 20, 33, 28, 26, 30, 28, 38, 45, 31, 26, 34, 34, 46], 604: [39, 51, 60, 65, 78, 80, 63, 49, 16, 36, 50, 32, 29, 29, 36, 29, 37, 28, 36, 40, 28, 43, 34, 50], 605: [37, 43, 47, 67, 77, 71, 65, 44, 16, 28, 36, 26, 25, 27, 32, 39, 40, 38, 30, 42, 28, 40, 31, 29], 606: [48, 45, 69, 77, 66, 76, 72, 66, 39, 34, 34, 21, 22, 30, 34, 39, 27, 36, 44, 35, 30, 29, 43, 43], 607: [49, 46, 60, 66, 64, 78, 63, 64, 36, 19, 22, 27, 29, 28, 31, 32, 33, 37, 40, 36, 40, 34, 42, 54], 608: [53, 54, 58, 54, 57, 78, 77, 77, 41, 30, 19, 36, 36, 32, 40, 40, 38, 45, 45, 47, 41, 46, 50, 61], 609: [60, 58, 67, 66, 68, 84, 78, 77, 48, 31, 22, 30, 35, 28, 38, 38, 35, 46, 43, 51, 39, 50, 53, 64], 610: [44, 41, 48, 40, 65, 65, 59, 54, 39, 27, 30, 31, 33, 35, 30, 29, 35, 43, 43, 42, 43, 51, 47, 47], 611: [49, 58, 53, 56, 84, 73, 50, 57, 44, 35, 40, 38, 40, 39, 32, 33, 38, 47, 54, 50, 52, 57, 51, 58], 612: [56, 50, 52, 50, 93, 69, 65, 61, 43, 45, 40, 43, 43, 45, 34, 35, 41, 42, 40, 47, 52, 48, 47, 54], 613: [55, 59, 50, 48, 86, 83, 75, 70, 47, 49, 39, 46, 40, 38, 40, 35, 34, 39, 46, 47, 50, 56, 43, 55], 614: [40, 62, 66, 100, 100, 100, 94, 92, 80, 78, 54, 66, 46, 52, 18, 40, 30, 45, 42, 27, 57, 53, 77, 76], 615: [44, 67, 60, 45, 71, 90, 95, 92, 75, 62, 74, 60, 58, 60, 62, 20, 40, 67, 82, 57, 42, 74, 54, 85], 616: [47, 47, 52, 59, 81, 67, 52, 53, 45, 31, 37, 37, 36, 32, 36, 31, 38, 47, 59, 52, 57, 59, 48, 57], 617: [60, 71, 63, 66, 80, 68, 70, 73, 55, 39, 31, 49, 46, 39, 36, 39, 45, 62, 56, 63, 64, 55, 63, 52], 618: [54, 58, 60, 66, 75, 76, 56, 58, 47, 38, 39, 41, 37, 38, 37, 35, 45, 49, 55, 64, 59, 72, 64, 66], 619: [69, 69, 72, 76, 81, 80, 60, 68, 53, 45, 43, 51, 46, 49, 42, 41, 52, 52, 68, 78, 71, 69, 70, 80], 620: [100, 100, 100, 0, 0, 0, 100, 70, 66, 41, 40, 66, 61, 75, 85, 81, 72, 88, 92, 88, 80, 75, 83, 100], 621: [78, 77, 0, 100, 0, 100, 100, 63, 20, 71, 37, 69, 69, 56, 73, 70, 68, 65, 86, 83, 50, 72, 100, 83], 622: [100, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 33, 75, 100, 50, 100, 100, 50, 100, 85, 100, 50, 0, 0], 623: [60, 56, 100, 37, 100, 60, 62, 52, 83, 76, 77, 58, 53, 61, 60, 45, 75, 36, 89, 86, 63, 77, 100, 100], 624: [100, 0, 100, 100, 0, 0, 0, 25, 50, 33, 62, 40, 57, 70, 15, 0, 100, 55, 80, 70, 87, 50, 100, 66], 625: [75, 68, 75, 75, 50, 100, 80, 18, 41, 36, 53, 40, 44, 54, 23, 18, 48, 48, 61, 72, 81, 85, 61, 45], 626: [87, 100, 100, 100, 0, 0, 100, 80, 25, 0, 0, 58, 62, 65, 62, 57, 88, 66, 80, 87, 80, 85, 100, 100], 627: [100, 100, 0, 0, 0, 0, 100, 0, 0, 50, 66, 50, 55, 80, 65, 62, 100, 87, 66, 80, 100, 100, 0, 50], 628: [72, 63, 100, 100, 100, 0, 100, 25, 100, 88, 77, 64, 69, 64, 60, 48, 76, 68, 84, 94, 58, 66, 89, 100], 629: [100, 50, 0, 0, 100, 0, 50, 100, 0, 66, 73, 18, 32, 50, 35, 50, 58, 45, 62, 83, 80, 0, 100, 50], 630: [70, 100, 0, 75, 100, 0, 25, 0, 33, 18, 50, 33, 50, 53, 28, 26, 33, 48, 59, 75, 100, 90, 60, 0], 631: [75, 100, 100, 100, 0, 0, 100, 100, 50, 50, 50, 83, 71, 70, 56, 59, 90, 84, 84, 86, 50, 87, 100, 0], 632: [100, 100, 100, 33, 0, 0, 0, 100, 100, 90, 89, 72, 79, 73, 28, 100, 87, 75, 87, 82, 75, 92, 100, 0], 633: [75, 66, 100, 50, 0, 0, 0, 100, 100, 78, 82, 64, 63, 64, 66, 47, 80, 52, 79, 83, 75, 84, 100, 100], 634: [55, 85, 0, 66, 0, 0, 50, 100, 100, 12, 57, 37, 63, 55, 50, 15, 26, 37, 46, 60, 100, 100, 75, 0], 635: [50, 90, 0, 66, 0, 0, 33, 100, 100, 18, 50, 62, 64, 68, 41, 27, 50, 58, 64, 75, 84, 95, 82, 75], 636: [77, 88, 100, 0, 0, 0, 0, 100, 100, 75, 73, 72, 75, 67, 61, 61, 75, 68, 93, 84, 81, 84, 94, 100], 637: [50, 100, 100, 100, 0, 0, 0, 75, 50, 50, 68, 80, 73, 74, 55, 50, 66, 69, 85, 81, 90, 78, 94, 90], 638: [50, 100, 100, 100, 0, 0, 100, 100, 0, 80, 73, 72, 78, 76, 57, 71, 79, 88, 91, 86, 94, 80, 100, 100], 639: [0, 100, 0, 100, 100, 0, 0, 0, 100, 100, 0, 75, 70, 100, 68, 44, 50, 40, 60, 72, 76, 87, 66, 66], 640: [85, 75, 50, 0, 0, 66, 75, 50, 0, 42, 100, 100, 66, 0, 55, 80, 50, 33, 100, 66, 100, 100, 82, 100], 641: [33, 90, 100, 100, 0, 0, 60, 80, 100, 30, 33, 76, 85, 41, 53, 53, 63, 79, 82, 88, 90, 82, 87, 100], 642: [75, 82, 85, 75, 86, 86, 83, 77, 67, 61, 59, 63, 76, 56, 62, 57, 50, 63, 77, 78, 86, 78, 71, 80], 643: [100, 54, 66, 100, 0, 0, 0, 0, 100, 100, 0, 50, 66, 0, 0, 100, 0, 83, 100, 100, 75, 77, 87, 70], 644: [75, 79, 84, 73, 84, 89, 78, 81, 69, 64, 52, 64, 74, 50, 56, 55, 50, 67, 75, 85, 81, 80, 74, 82], 645: [79, 59, 76, 80, 0, 100, 20, 60, 91, 28, 33, 100, 0, 87, 54, 33, 41, 50, 50, 90, 95, 70, 88, 69], 646: [76, 75, 80, 75, 82, 85, 66, 81, 72, 63, 68, 63, 64, 52, 60, 47, 51, 66, 71, 79, 77, 76, 77, 82], 647: [69, 71, 72, 66, 77, 79, 68, 74, 67, 60, 52, 50, 59, 55, 50, 46, 47, 54, 63, 74, 64, 71, 66, 75], 648: [60, 59, 75, 71, 84, 86, 88, 84, 62, 43, 45, 41, 58, 40, 46, 50, 43, 50, 53, 52, 51, 69, 62, 73], 649: [89, 95, 97, 83, 100, 95, 91, 81, 77, 69, 78, 77, 70, 70, 71, 68, 57, 78, 90, 85, 82, 86, 96, 87], 650: [90, 90, 71, 76, 100, 88, 88, 95, 63, 83, 75, 90, 61, 62, 77, 77, 58, 76, 97, 92, 93, 92, 92, 100], 651: [92, 88, 91, 100, 93, 81, 90, 85, 100, 96, 81, 64, 88, 66, 66, 94, 33, 75, 87, 98, 84, 89, 90, 92], 652: [50, 55, 63, 63, 60, 75, 59, 44, 50, 35, 35, 23, 25, 16, 15, 27, 22, 24, 26, 39, 33, 40, 48, 59], 653: [27, 25, 41, 40, 45, 64, 73, 58, 24, 23, 32, 31, 36, 29, 26, 29, 28, 34, 33, 28, 20, 34, 32, 49], 654: [68, 74, 74, 73, 66, 81, 71, 81, 52, 57, 52, 55, 72, 45, 41, 44, 46, 49, 61, 61, 59, 65, 68, 82], 655: [64, 60, 60, 60, 64, 71, 66, 69, 52, 34, 33, 49, 46, 48, 57, 53, 50, 45, 76, 74, 70, 78, 59, 69], 656: [75, 82, 85, 100, 100, 57, 50, 26, 44, 27, 23, 50, 33, 30, 37, 40, 7, 37, 85, 72, 74, 73, 62, 62], 657: [35, 61, 25, 27, 66, 60, 51, 41, 22, 32, 35, 32, 27, 25, 28, 37, 35, 18, 53, 55, 34, 55, 38, 41], 658: [100, 100, 100, 100, 100, 0, 0, 100, 100, 66, 20, 77, 100, 50, 60, 71, 50, 33, 60, 59, 75, 90, 58, 100], 659: [48, 23, 37, 37, 52, 68, 24, 41, 50, 33, 46, 40, 47, 42, 37, 34, 25, 51, 43, 54, 48, 53, 44, 49], 660: [45, 49, 55, 27, 73, 90, 74, 67, 57, 45, 48, 50, 43, 36, 53, 57, 37, 48, 45, 65, 58, 67, 63, 58], 661: [46, 37, 27, 12, 46, 70, 49, 48, 47, 33, 47, 46, 44, 42, 39, 37, 26, 51, 51, 60, 51, 58, 62, 55], 662: [28, 40, 62, 64, 78, 64, 64, 44, 21, 29, 34, 35, 28, 27, 30, 35, 37, 37, 37, 36, 34, 42, 37, 39], 663: [85, 85, 83, 87, 94, 75, 89, 88, 65, 58, 60, 64, 61, 61, 62, 69, 71, 72, 84, 86, 83, 85, 86, 93], 664: [70, 81, 67, 72, 57, 82, 78, 85, 77, 58, 43, 57, 60, 56, 44, 66, 50, 70, 83, 85, 70, 73, 76, 77], 665: [38, 43, 45, 53, 61, 60, 38, 47, 37, 28, 23, 24, 24, 21, 19, 18, 25, 19, 24, 37, 31, 33, 35, 47], 666: [65, 80, 71, 87, 83, 80, 85, 61, 77, 59, 41, 46, 47, 52, 47, 51, 58, 59, 65, 73, 47, 56, 71, 54], 667: [60, 70, 44, 87, 100, 77, 84, 54, 63, 56, 24, 44, 52, 47, 39, 48, 38, 54, 66, 71, 44, 46, 74, 64], 668: [71, 80, 60, 61, 100, 72, 68, 65, 58, 51, 49, 50, 56, 56, 50, 47, 46, 56, 70, 65, 69, 76, 66, 73], 669: [51, 50, 53, 64, 77, 87, 84, 81, 76, 66, 52, 59, 51, 31, 38, 37, 38, 41, 53, 61, 44, 66, 67, 65], 670: [53, 55, 56, 63, 78, 84, 72, 71, 63, 41, 44, 48, 31, 30, 35, 27, 34, 33, 51, 48, 43, 55, 63, 61], 671: [49, 51, 43, 40, 64, 78, 82, 79, 64, 50, 41, 51, 37, 33, 41, 32, 34, 45, 45, 54, 41, 54, 56, 51], 672: [68, 71, 78, 86, 81, 91, 86, 89, 70, 60, 53, 51, 47, 32, 24, 27, 45, 39, 50, 65, 59, 70, 68, 82], 673: [56, 59, 75, 74, 70, 78, 68, 73, 78, 66, 66, 45, 58, 48, 35, 30, 18, 25, 45, 61, 59, 55, 60, 64], 674: [100, 100, 100, 100, 100, 100, 100, 0, 0, 80, 0, 100, 0, 100, 100, 0, 100, 0, 100, 0, 100, 0, 66, 0], 675: [60, 66, 61, 59, 71, 92, 88, 80, 76, 63, 47, 48, 49, 47, 41, 30, 40, 47, 58, 69, 53, 58, 64, 64], 676: [53, 60, 71, 72, 86, 74, 68, 58, 52, 48, 41, 40, 37, 28, 23, 17, 25, 29, 29, 48, 41, 47, 47, 53], 677: [47, 47, 59, 54, 65, 69, 63, 64, 57, 44, 41, 42, 38, 34, 29, 27, 24, 25, 27, 42, 38, 40, 41, 47], 678: [35, 44, 62, 64, 67, 73, 72, 77, 70, 71, 63, 58, 52, 40, 14, 4, 19, 21, 33, 65, 53, 46, 63, 65]}
		var noloadflage = false;
		
		$("#testnoload").on('click', function(){
			if(!noloadflage){
				$("#show_road_icon").css('display', 'block')
				d3.select(".trip1").remove();
    			d3.selectAll(".haha").remove();
    			d3.select(".leaflet-popup").remove();
				noloadflage = true
				let compute1 = d3.interpolate('#60CDBE', '#FDFFBF');  // 绿0  空载率最大        黄1 空载率中等
				let compute2 = d3.interpolate('#AA1B27', '#FDFFBF');   //红0  空载率最小        黄1 空载率中等
				let linear1 = d3.scaleLinear()  
					           .domain([0,50])  
					           .range([0,1]);
				let linear2 = d3.scaleLinear()  
					           .domain([50,100])  
					           .range([1,0]);
				var dt = [];
				for(let i = 0; i<RS.length; i++){
				  		dt.push(RS[i].R);
				  	}
				let jj = 2.5;
				let color;
				for(let j = 0; j<dt.length; j++){
					if(j != 464){
						if(noloaddata[j+1][0]>50){
							color = compute1(linear2(noloaddata[j+1][0]))
						}else{
							color = compute2(linear1(noloaddata[j+1][0]))
						}
				  		if(dt[j].length == 4){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
				  					    .addTo(map);
				  		}else if(dt[j].length == 3){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
				  						.addTo(map);
				  		}
				  		centerlist.push(polyline.getCenter())
					}
				}
			}else{
				$("#show_road_icon").css('display', 'none')
				noloadflage = false;
				for(let i = 0; i<678; i++ ){
					var aaaa = "road"+i;
					d3.select("."+aaaa).remove();
				}
			}
			
		})
		
		function taxi_mode_show_road(){
			var dt = [];
			for(let i = 0; i<RS.length; i++){
			  		dt.push(RS[i].R);
			  	}
			let jj = 2.5;
			let color;
			for(let j = 0; j<dt.length; j++){
				if(j != 464){
					if(noloaddata[j+1][0]>50){
						color = "none"
					}else{
						color = "none"
					}
			  		if(dt[j].length == 4){
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
			  					    .addTo(map);
			  		}else if(dt[j].length == 3){
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
			  						.addTo(map);
			  		}else{
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)])], {color: color, opacity: 1, weight: jj, className: 'road'+j})
			  						.addTo(map);
			  		}
//			  		centerlist.push(polyline.getCenter())
				}
			}
		}
		
		
		
		function drawaveragefee(data, data1, data2, A, timedata){
			var datatext = [A, 'aveincome'], datalinecolor = ['green', 'yellow']
			var lastxint = 0;
			var wi41 = 318.5,he41 = 270, padding41 = {top:30, bottom:30, left:25, right:20};
			var wi42 = 318.5,he42 = 90, padding42 = {top:30, bottom:30, left:25, right:30};
			var svg41 = d3.select("#view1").append("svg")
										  .attr("width", wi41)
										  .attr("height", he41)
										  .attr("class", "svg41")
//			var svg42 = d3.select("#view1").append("svg")
//										  .attr("width", wi42)
//										  .attr("height", he42)
//										  .attr("class", "svg42")
			var xax41 = wi41-padding41.left-padding41.right;
		    var yax41 = he41-padding41.top-padding41.bottom;
		    var xax42 = wi42-padding42.left-padding42.right;
		    var yax42 = he42-padding42.top-padding42.bottom;
		    var svg4max = d3.max([d3.max(data[0]), d3.max(data[1])]);
		    var svg4min = d3.min([d3.min(data[0]), d3.min(data[1])]);
		    var xSca41 = d3.scaleLinear()
		                 .domain([0, 24])
		                 .range([0,xax41]);
		    var ySca41 = d3.scaleLinear()
		                 .domain([svg4min-19, svg4max+40])
		                 .range([yax41,0]);
		    var xAxisL41 = d3.axisBottom(xSca41)
		              		 .ticks(10)
			var yAxisL41 = d3.axisLeft(ySca41)
			                .ticks(5)
						
			var gX41 = svg41.append("g")
			            .attr("transform","translate("+padding41.left+","+(he41-padding41.bottom)+")")
			            .attr("class","gx41")
			            .call(xAxisL41)
			
			var gY41 = svg41.append("g")
			            .attr("transform","translate("+padding41.left+","+(he41-yax41-padding41.bottom)+")")
			            .attr("class", "gy41")
			            .call(yAxisL41);
			var usedata1 = [], usedata2 = []
			for (var j = 0; j< data[0].length; j++){
				usedata1.push([
					j+0.5,
					data[0][j]
				]);
				usedata2.push([
					j+0.5,
					data[1][j]
				]);
			}
			
			var linepath = d3.line()
//							 .curve(d3.curveCatmullRom.alpha(0.9))
							 .x(function(d, i){return xSca41(d[0]);})
							 .y(function(d, i){return ySca41(d[1]);});
			
			var g = svg41.append("g")
						 .on("mousemove", mousemove)
						 .on("mouseout", function(d){
						   	$("#tripinfo").css("display", "none")
						   })
			var interaction = g.append("rect")
								   .attr("class", "kaka")
								   .attr("x", padding41.left)
								   .attr("y", padding41.top)
								   .attr("width", xax41)
								   .attr("height", yax41)
			var svg41path1 = g.append('path')
							  .attr("transform", "translate("+ padding41.left +", "+ (padding41.top) +")")
							  .attr("d", linepath(usedata1))
							  .attr("fill", "none")
							  .attr("stroke-width", 2.5)
							  .attr("stroke", "yellow")
							  .attr("class", "svg41path1")
			var svg41path2 = g.append('path')
							  .attr("transform", "translate("+ padding41.left +", "+ (padding41.top) +")")
							  .attr("d", linepath(usedata2))
							  .attr("fill", "none")
							  .attr("stroke-width", 2.5)
							  .attr("stroke", "green")
							  .attr("class", "svg41path2")
			var svg41circle1 = g.selectAll(".svg41circle1")
								.data(usedata1)
								.enter()
								.append('circle')
							    .attr("cx",(d,i)=>padding41.left + xSca41(d[0]))
			                    .attr("cy",(d,i)=>padding41.top + ySca41(d[1]))
			                    .attr("r", 4)
			                    .attr("opacity", 0)
							  	.attr("fill", "black")
							  	.attr("class", "svg41circle1")
			var svg41circle1 = g.selectAll(".svg41circle2")
								.data(usedata2)
								.enter()
								.append('circle')
							    .attr("cx",(d,i)=>padding41.left + xSca41(d[0]))
			                    .attr("cy",(d,i)=>padding41.top + ySca41(d[1]))
			                    .attr("r", 4)
							  	.attr("fill", "red")
							  	.attr("opacity", 0)
							  	.attr("class", "svg41circle2")
			var textfee = g.selectAll(".textfee")
						   .data(datatext)
						   .enter()
						   .append("text")
						   .attr("fill", '#2F2F2F')
						   .attr("x", 240)
						   .attr("y", (d, i)=> 35+i*20)
						   .style("font-weight", "700")
		                   .style("font-size", "11px")
						   .attr("class", "textfee")
						   .text(function(d){return d})
			var linefee = g.selectAll(".linefee")
						   .data(datalinecolor)
						   .enter()
						   .append("line")
						   .attr("x1", 205)
						   .attr("y1", (d, i)=> 32+i*20)
						   .attr("x2", 235)
						   .attr("y2", (d, i)=> 32+i*20)
						   .attr("stroke", (d,i)=>d)
						   .attr("stroke-width", '2')
						   .attr("class", "linefee")
						   
			
			function mousemove(d){
				d3.select(this).style("cursor", "pointer")
			   	let xint = Math.round(xSca41.invert(d3.event.pageX-padding41.left-padding41.right)-0.5);
			   	let c1 = d3.selectAll(".svg41circle1")._groups[0], c2 = d3.selectAll(".svg41circle2")._groups[0]
			   	let compute1 = d3.interpolate('#60CDBE', '#FDFFBF');  // 绿0  空载率最大        黄1 空载率中等
				let compute2 = d3.interpolate('#AA1B27', '#FDFFBF');   //红0  空载率最小        黄1 空载率中等
//				console.log(xint, d3.event.pageX)
				let linear1 = d3.scaleLinear()  
					           .domain([0,50])  
					           .range([0,1]);
				let linear2 = d3.scaleLinear()  
					           .domain([50,100])  
					           .range([1,0]);
				let color1
			   	for(var j = 0; j<24; j++){
			   		if(j == xint){
			   			d3.select(c1[j]).attr("opacity", 1);
			   			d3.select(c2[j]).attr("opacity", 1);
			   		}else{
			   			d3.select(c1[j]).attr("opacity", 0);
			   			d3.select(c2[j]).attr("opacity", 0);
			   		}
			   	}
			   	var triprect = d3.selectAll(".rect3")
			   	var slinear = d3.scaleLinear()
			   					.domain([50, 319])
			   					.range([0, 268.5])
			   	d3.select(".p1").attr("transform", function(){
							return "translate("+slinear(d3.event.x)+",0)"
						})
			   	if(mode_flag == 0){
			   		let newlatlng = []
				   	d3.selectAll(".haha").remove();
				   	d3.selectAll(".road").remove();
					d3.selectAll(".trip1").remove();
					d3.selectAll(".leaflet-popup").remove();
				   	for(var k = 0; k<timedata.traj.length; k++){
			   			if(timedata.traj[k].time[0]>=xint*60 && timedata.traj[k].time[0]<(xint+1)*60){
			   				let newlatlng = []
			   				for(var bb = 0; bb<timedata.traj[k].latlng.length; bb++){
			    				newlatlng.push(latlngtran.wgs84togcj02(timedata.traj[k].latlng[bb]))
			    			}
			    			if(newlatlng.length>=2){
			    				L.marker(newlatlng[0], {icon: Icon1(startendurl[0])}).addTo(map) //.bindPopup('<p>Type:  '+ triptype +' <br />Fee:  '+tripfee+' rmb<br /> Time: '+timevalue+' min</p>') //.openPopup();
								L.marker(newlatlng[newlatlng.length-1], {icon: Icon1(startendurl[1])}).addTo(map).on("click", function(){
									d3.selectAll(".haha").remove();
									d3.selectAll(".trip1").remove();
									d3.selectAll(".leaflet-popup").remove();
								});
				    			var polyline = L.polyline(newlatlng, {color: 'red', className: 'trip1'}).addTo(map);
			    			}
				   		}
			   		}
			   		$("#tripinfo").css('display', "block")
			   		let a, b, c, d = 0;
			   		$("#show_road_icon").css('display', 'block')
			   		$("#show_road_count").css('display', 'none')
			   		d3.selectAll('.rect3').attr("stroke-width", "0")
			   		if(xint>=0 && xint != 24){ 
				   		for(var i = 0; i< 678; i++){
							if(data1[i+1][xint]>50){
								color1 = compute1(linear2(data1[i+1][xint]))
							}else{
								color1 = compute2(linear1(data1[i+1][xint]))
							}
							d3.select(".road"+i).attr("stroke", color1)
						}
				   		if(xint<9){
				   			c = "0"+xint
				   		}else{
				   			c = xint
				   		}
				   		for(var k = 0; k<timedata.traj.length; k++){
				   			if(timedata.traj[k].time[0]>=xint*60 && timedata.traj[k].time[0]<(xint+1)*60){
				   				d += 1;
				   			}
				   		}
				   		a = usedata2[xint][1]
				   		b = usedata1[xint][1]
				   		$(".trip_p1").html(""+c+" H");
				   		$(".trip_p2").html("trip num: "+d+"");
						$(".trip_p3").html("income : "+a+" rmb");
						$(".trip_p4").html("aveincome : "+b+" rmb");
			   		
						d3.selectAll(".circle0").remove()
				   		if(data2[xint].length>0){
				   			for(var q=0; q<data2[xint].length; q++){

								L.circle(centerlist[data2[xint][q]-1],{
							        	color: 'black',//颜色
							            fillColor: 'black',
							            fillOpacity: 0.8,//透明度
							            opacity: 1,
							            weight: 1,
							            radius: 0,//25,
							            className: 'circle0'
							        	}).addTo(map)
				   			}
				   		}
				   	}
			   	}
			   	
			}
		}
		
		$("#view2Tab").on("click", function(){
			$("#view1").animate({
			    opacity: "0",
			    left:'-312.5px',
			}, 500, function(){
				$(this).css("display", "none")
			})
			$("#view2").css("display", "block")
						.animate({
							opacity: "1",
						    left:'6px',
						}, 500)
					})
		$("#view1Tab").on("click", function(){
			$("#view1").css("display", "block")
						.animate({
							opacity: "1",
						    left:'6px',
						}, 500)
			$("#view2").animate({
			    opacity: "0",
			    left:'324.5px',
			}, 500, function(){
				$(this).css("display", "none")
			})
		})
		
		var buju3SameDivFlag = true;
		d3.selectAll(".buju3SameDiv").on("click", function(){
			if(buju3SameDivFlag){
				$(".buju3SameDiv").each(function(){
					$(this).animate({
						top: '87px',
					})
					$(this).find("i").removeClass("fa-plus").addClass("fa-close").css({"color":"red","top":"-2px"});
				})
				$(".flowAnimationDiv").slideDown();
				buju3SameDivFlag = false;
			}else{
				$(".flowAnimationDiv").slideUp();
				$(".buju3SameDiv").each(function(){
					$(this).animate({
						top: '9px',
					})
					$(this).find("i").removeClass("fa-close").addClass("fa-plus").css({"color":"#6483B2","top":"-2px"});
				})
				buju3SameDivFlag = true;
			}
		})
		
		var cli_positionFlag = true;
		$('#cli_position').on("click", function(){
			if(mode_flag == 2 || mode_flag == 1){
				if(cli_positionFlag){
					clear4();
					d3.selectAll(".road").remove();
					var latlngCount = 1;
					map.on("click", onMapclick)
	//				$("#cli_position .sameI").css("color", "yellow")
					$("#cli_position img").attr("src", "img/position2.png")
	//				$("#cli_trash .sameI").css("color", "red")
					cli_positionFlag = false;
				}else{
					map.off("click", onMapclick)
	//				$("#cli_position .sameI").css("color", "#5E6268")
					$("#cli_position img").attr("src", "img/position1.png")
	//				$("#cli_trash .sameI").css("color", "#5E6268")
					cli_positionFlag = true;
				}
			}
		})
		$('#cli_trash').on('click', function(){
			if(mode_flag == 0){
				d3.selectAll(".circle0").remove();
				d3.selectAll(".haha").remove();
				d3.selectAll(".leaflet-popup").remove();
				d3.selectAll(".trip1").remove();
			  	for(var j = 0; j<678; j++){
					var A = "road"+(j)
					d3.select('.'+A).attr("stroke", "none")			
				}
			  	$("#show_road_icon").css('display', 'none')
			  	$("#tripinfo").css('display', "none")
			  	d3.selectAll(".road").remove();
			}
			if(mode_flag == 1){
				for(var j = 0; j<678; j++){
					var A = "road"+(j)
					d3.select('.'+A).attr("stroke", "#D6D3D3")
									.attr("stroke-opacity", '1')
									.attr("stroke-width", '4')				
				}
				RS_set = [];
				index_d = [];
				$("#toolbar").fadeOut(500);
				d3.selectAll(".road").remove();
			}
			if(mode_flag == 2){
				$("#originInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"});
		    	$("#destinationInput").val("Select Position").css({"color": "#D3D3D3", "font-style": "italic"})
		    	$("#plan1").slideUp(300);
				$("#plan2").slideUp(300);
				d3.selectAll(".markerpoi1").remove();
		    	d3.selectAll(".markerpoi2").remove();
		    	onMapclickCount = 0;
		    	d3.selectAll(".haha").remove();
		    	d3.selectAll(".road").remove();
			    d3.selectAll(".road1").remove();
			    d3.selectAll(".road2").remove();
			    $('.ts').prop("checked",true)
			    $('.ds').prop("checked",true)
			    for(var j = 0; j<678; j++){
					var A = "road"+(j)
					d3.select('.'+A).remove()		
				}
			}
//		    d3.selectAll(".awesome-marker").remove();
//		    d3.selectAll(".h").remove();
		})
		
		function GetDistance( lat1,  lng1,  lat2,  lng2){
		    var radLat1 = lat1*Math.PI / 180.0;
		    var radLat2 = lat2*Math.PI / 180.0;
		    var a = radLat1 - radLat2;
		    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
		    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
		    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
		    s = s *6378.137 ;// EARTH_RADIUS;
		    s = Math.round(s * 10000) / 10000;
		    return s;
		}
//------------------------------------------------计算两坐标之间的距离------------------------------------------------
		var avefeedata, avedistencedata, countdata;
		$("#count").on("click", function(){
			if(mode_flag == 0){
				cleantaxi1()
				let data = parseInt($(".D1").val().substring(8, 10))
				var jsondata = JSON.stringify(data)
				$.ajax({
				  	type: 'post',
				  	data: jsondata,
				  	url: "http://127.0.0.1:8000/admin/post_view2.0_9/",
				  	success: function(result){
				  			countdata = result.data[0];
				  			avedistencedata = result.data[1];
				  			avefeedata = result.data[2];
				  			var compute = d3.interpolate(c2,c1); 
							var linear = d3.scaleLinear()  
								           .domain([0,d3.max(countdata)])  
								           .range([0,1]);
							var dt = [];
							for(let i = 0; i<RS.length; i++){
							  		dt.push(RS[i].R);
							  	}
							let jj = 2.5;
							for(let j = 0; j<dt.length; j++){
							  		if(dt[j].length == 4){
							  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)])], {color: compute(linear(countdata[j])), opacity: 1, weight: jj, className: 'road'})
							  					    .addTo(map);
							  		}else if(dt[j].length == 3){
							  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)])], {color: compute(linear(countdata[j])), opacity: 1, weight: jj, className: 'road'})
							  						.addTo(map);
							  		}else{
							  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)])], {color: compute(linear(countdata[j])), opacity: 1, weight: jj, className: 'road'})
							  						.addTo(map);
							  		}
							}
							$("#show_road_count").css("display", "block")
							$(".countname").html("Num").css("left", "11px")
							$(".countmax").html(d3.max(countdata))
							$(".countmin").html(d3.min(countdata))
			  		},
			  				dataType: 'JSON',
				});
			}
		})
		
		$("#avefee").on("click", function(){
			if(mode_flag == 0){
				cleantaxi1()
				var compute = d3.interpolate(c2,c1); 
				var linear = d3.scaleLinear()  
					           .domain([0,d3.max(avefeedata)])  
					           .range([0,1]);
				var dt = [];
				for(let i = 0; i<RS.length; i++){
			  		dt.push(RS[i].R);
			  	}
				let jj = 3;
				for(let j = 0; j<dt.length; j++){
				  		if(dt[j].length == 4){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)])], {color: compute(linear(avefeedata[j])), opacity: 1, weight: jj, className: 'road'})
				  					    .addTo(map);
				  		}else if(dt[j].length == 3){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)])], {color: compute(linear(avefeedata[j])), opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)])], {color: compute(linear(avefeedata[j])), opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}
			    }
				$("#show_road_count").css("display", "block")
				$(".countname").html("Fee").css("left", "15px")
				$(".countmax").html(d3.max(avefeedata))
				$(".countmin").html(d3.min(avefeedata))
			}
		})
		
		$("#avedistence").on("click", function(){
			if(mode_flag == 0){
				cleantaxi1()
				var compute = d3.interpolate(c2,c1); 
				var linear = d3.scaleLinear()  
					           .domain([0,d3.max(avedistencedata)])  
					           .range([0,1]);
				var dt = [];
				for(let i = 0; i<RS.length; i++){
				  		dt.push(RS[i].R);
				  	}
				let jj = 3;
				for(let j = 0; j<dt.length; j++){
				  		if(dt[j].length == 4){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][3].lat),parseFloat(dt[j][3].lng)])], {color: compute(linear(avedistencedata[j])), opacity: 1, weight: jj, className: 'road'})
				  					    .addTo(map);
				  		}else if(dt[j].length == 3){
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][2].lat),parseFloat(dt[j][2].lng)])], {color: compute(linear(avedistencedata[j])), opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}else{
				  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[j][0].lat),parseFloat(dt[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[j][1].lat),parseFloat(dt[j][1].lng)])], {color: compute(linear(avedistencedata[j])), opacity: 1, weight: jj, className: 'road'})
				  						.addTo(map);
				  		}
				 }
				$("#show_road_count").css("display", "block")
				$(".countname").html("Dist").css("left", "14px")
				$(".countmax").html(d3.max(avedistencedata))
				$(".countmin").html(d3.min(avedistencedata))
			}
		})
		
		/////////////////////////////////////////坐标转换class////////////////////////////////////////////
		function Latlngtransform(){
			var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
			var PI = 3.1415926535897932384626;
			var a = 6378245.0;
			var ee = 0.00669342162296594323;
			this.bd09togcj02 = function(A){               // [lat, lng] 即 百度 转 谷歌、高德
				var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
			    var x = A[1] - 0.0065;
			    var y = A[0] - 0.006;
			    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			    var gg_lng = z * Math.cos(theta);
			    var gg_lat = z * Math.sin(theta);
			    return [gg_lat, gg_lng]   //返回[lat, lng]
			}
			
			this.gcj02tobd09 = function(A){     //即谷歌、高德 转 百度
			    var z = Math.sqrt(A[1] * A[1] + A[0] * A[0]) + 0.00002 * Math.sin(A[0] * x_PI);
			    var theta = Math.atan2(A[0], A[1]) + 0.000003 * Math.cos(A[1] * x_PI);
			    var bd_lng = z * Math.cos(theta) + 0.0065;
			    var bd_lat = z * Math.sin(theta) + 0.006;
			    return [bd_lat, bd_lng]
			}
			
			this.wgs84togcj02 = function(A){   //WGS84转GCj02
				if (out_of_china(A[1], A[0])) {
			        return [A[1], A[0]]
			    }
			    else {
			        var dlat = transformlat(A[1] - 105.0, A[0] - 35.0);
			        var dlng = transformlng(A[1] - 105.0, A[0] - 35.0);
			        var radlat = A[0] / 180.0 * PI;
			        var magic = Math.sin(radlat);
			        magic = 1 - ee * magic * magic;
			        var sqrtmagic = Math.sqrt(magic);
			        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			        var mglat = A[0] + dlat;
			        var mglng = A[1] + dlng;
			        return [mglat, mglng]
			    }
			}
			
			this.gcj02towgs84 = function(A){   //  GCJ02 (火星坐标系)转换为 WGS84(国际标准)
				if (out_of_china(A[1], A[0])) {
			        return [A[1], A[0]]
			    }
			    else {
			        var dlat = transformlat(A[1] - 105.0, A[0] - 35.0);
			        var dlng = transformlng(A[1] - 105.0, A[0] - 35.0);
			        var radlat = A[0] / 180.0 * PI;
			        var magic = Math.sin(radlat);
			        magic = 1 - ee * magic * magic;
			        var sqrtmagic = Math.sqrt(magic);
			        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
			        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
			        mglat = A[0] + dlat;
			        mglng = A[1] + dlng;
			        return [A[0] * 2 - mglat, A[1] * 2 - mglng]
			    }
			}
			
			function transformlat(lng, lat) {
			    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
			    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
			    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
			    return ret
			}
			function transformlng(lng, lat) {
			    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
			    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
			    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
			    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
			    return ret
			}
			
			function out_of_china(lng, lat) {
			    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
			}
		}
		
		function Icon(a, b){
			var myIcon = L.icon({
			    iconUrl: a,
			    iconSize: [25, 23],
			    iconAnchor: [12, 23],
			    popupAnchor: [3, -20],//[-3, -76],
			    shadowUrl: 'img/marker-shadow.png',
			    shadowSize: [27, 36],
			    shadowAnchor: [0, 35],
			    className: b
			});
			return myIcon
		}
		function Iconexp(a, b){
			var myIcon = L.icon({
			    iconUrl: a,
			    iconSize: [19, 17],
			    iconAnchor: [7, 14],
			    popupAnchor: [3, -20],//[-3, -76],
			    shadowUrl: 'img/marker-shadow.png',
			    shadowSize: [18, 29],
			    shadowAnchor: [3, 28],
			    className: b
			});
			return myIcon
		}
		$('#closeplan1').on("click", function(){
			$('#plan1').slideUp(300)
		}).on("mousemove", function(){
			$(this).css("color", "red")
		}).on("mouseout", function(){
			$(this).css("color", "silver")
		})
		$('#closeinfo').on("click", function(){
			$('#tripinfo').css('display', "none")
		}).on("mousemove", function(){
			$(this).css("color", "red")
		}).on("mouseout", function(){
			$(this).css("color", "silver")
		})
		$('#closeplan2').on("click", function(){
			$('#plan2').slideUp(300)
		}).on("mousemove", function(){
			$(this).css("color", "red")
		}).on("mouseout", function(){
			$(this).css("color", "silver")
		})
		$(".ts").change(function() { 
				if($(this).is(':checked')){
					d3.selectAll('.road1').style("opacity", 1)
					d3.selectAll('.markerpoi1').style("opacity", 1)
				}else{
					d3.selectAll('.road1').style("opacity", 0)
					d3.selectAll('.markerpoi1').style("opacity", 0)
				};
		});
		$(".ds").change(function() { 
				if($(this).is(':checked')){
					d3.selectAll('.road2').style("opacity", 1)
					d3.selectAll('.markerpoi2').style("opacity", 1)
				}else{
					d3.selectAll('.road2').style("opacity", 0)
					d3.selectAll('.markerpoi2').style("opacity", 0)
				};
		});
		$("#searchshortroad").on("click", function(){
			let o1 = $("#originInput").val()
			let d1 = $("#destinationInput").val()
			let dd = $(".D1").val()
			let tt = $("#time3").val()
			$('.ts').prop("checked",true)
			$('.ds').prop("checked",true)
			var poiset = []
			$("#POIcontain .selectPOI").each(function(){
				let temp =  $(this).val()
				if(temp == "Gas station"){
					poiset.push(0)
				}else if(temp == "Supermarket"){
					poiset.push(1)
				}else if (temp == "Bank"){
					poiset.push(2)
				}
			})
			dd = parseInt(dd.substring(5,7)+dd.substring(8,10))
			tt = parseInt(tt.substring(0, 2))*60 + parseInt(tt.substring(3, 5))
			d3.selectAll(".road1").remove()
			d3.selectAll(".road2").remove()
			d3.selectAll(".road").remove()
			d3.selectAll(".markerpoi1").remove()
			d3.selectAll(".markerpoi").remove()
			d3.selectAll(".markerpoi2").remove()
			let data = [[dd, tt], latlngtran.gcj02towgs84([parseFloat(o1.substring(0, 10)), parseFloat(o1.substring(11, o1.length))]), latlngtran.gcj02towgs84([parseFloat(d1.substring(0, 10)), parseFloat(d1.substring(11, d1.length))]), poiset];
			var jsondata = JSON.stringify(data)
			$.ajax({
			  	type: 'post',
			  	data: jsondata,
			  	url: "http://127.0.0.1:8000/admin/post_view2.0_1_1/",
			  	success: function(result){
			  			console.log(result.data)
			  			xx = result.data[0]
			  			yy = result.data[1][0]
			  			zz = result.data[1][1]
			  			distime = result.data[1][2]
			  			yy1 = result.data[1][3][0]
			  			zz1 = result.data[1][3][1]
			  			distime1 = result.data[1][3][2]
			  			var dt = [];
						for(let i = 0; i<RS.length; i++){
						  		dt.push(RS[i].R);
					  	}
						let jj = 4, color1 = "red", color2 = "green", classname1 = 'road1', classname2 = 'road2';
						for(let j = 0; j<yy.length; j++){
//							classname1 = "road"+(yy[j]-1)
					  		if(dt[yy[j]].length == 4){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][0].lat),parseFloat(dt[yy[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][1].lat),parseFloat(dt[yy[j]][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][2].lat),parseFloat(dt[yy[j]][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][3].lat),parseFloat(dt[yy[j]][3].lng)])], {color: color1, opacity: 1, weight: jj, className: classname1})
					  					    .addTo(map);
					  		}else if(dt[yy[j]].length == 3){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][0].lat),parseFloat(dt[yy[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][1].lat),parseFloat(dt[yy[j]][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][2].lat),parseFloat(dt[yy[j]][2].lng)])], {color: color1, opacity: 1, weight: jj, className: classname1})
					  						.addTo(map);
					  		}else{
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][0].lat),parseFloat(dt[yy[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy[j]][1].lat),parseFloat(dt[yy[j]][1].lng)])], {color: color1, opacity: 1, weight: jj, className: classname1})  //compute(linear(j))
					  						.addTo(map);
					  				}
			  			}
						for(let j = 0; j<yy1.length; j++){
//							classname2 = "road"+(yy1[j]-1)
					  		if(dt[yy1[j]].length == 4){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][0].lat),parseFloat(dt[yy1[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][1].lat),parseFloat(dt[yy1[j]][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][2].lat),parseFloat(dt[yy1[j]][2].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][3].lat),parseFloat(dt[yy1[j]][3].lng)])], {color: color2, opacity: 1, weight: jj, className: classname2})
					  					    .addTo(map);
					  		}else if(dt[yy1[j]].length == 3){
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][0].lat),parseFloat(dt[yy1[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][1].lat),parseFloat(dt[yy1[j]][1].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][2].lat),parseFloat(dt[yy1[j]][2].lng)])], {color: color2, opacity: 1, weight: jj, className: classname2})
					  						.addTo(map);
					  		}else{
					  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][0].lat),parseFloat(dt[yy1[j]][0].lng)]), latlngtran.wgs84togcj02([parseFloat(dt[yy1[j]][1].lat),parseFloat(dt[yy1[j]][1].lng)])], {color: color2, opacity: 1, weight: jj, className: classname2})  //compute(linear(j))
					  						.addTo(map);
					  				}
			  			}
//						var jiayouzhan = [[28.02413714933647, 120.59231042225338], [28.015934899920968, 120.59315026941096], [28.017598397231286, 120.62720196345933], [28.009579342593884, 120.62550163098484], [28.004809263717274, 120.6377347358212], [28.000074927774197, 120.64247435857678], [27.992482860393906, 120.61876601277979], [27.992104445387593, 120.60749471675399], [27.993834499500956, 120.59902840873255], [27.9983632248212, 120.57988691256617], [28.001944474596744, 120.53743200927599], [27.999633509627124, 120.52437863104052], [27.978214046777026, 120.60770144869474], [27.955071352120193, 120.65266490834357], [27.9653176851755, 120.64911771368132], [27.986462823349424, 120.65501696595717], [27.997350447524123, 120.65502095445483], [28.01347812138269, 120.66705297980423], [28.015035095719373, 120.66924746435298], [28.019297316444796, 120.68774780687814], [28.01771443723763, 120.70621800507885], [28.00767663671109, 120.69690530221277], [28.002598635672513, 120.68419684673563], [27.986642698545882, 120.6745876857921], [27.984271931841366, 120.70085525943868], [27.984697329417944, 120.70832005502233], [27.984097330201774, 120.7399269765568], [27.97572205516592, 120.73910976819276], [27.971630382870295, 120.75580264582993], [27.971289933938486, 120.76749069435073], [27.965601668324616, 120.79305442831875], [27.95561947468276, 120.77686008455481], [27.925200486519664, 120.8020982668211], [27.936241159392875, 120.83517768317648], [27.919759447346674, 120.82837010165798], [27.956276440370928, 120.68327601200721], [27.92890669681355, 120.67737355861688], [27.936301398217683, 120.68736750050368], [28.038314802127122, 120.65582024743188], [28.04926515433207, 120.660035441963], [28.05608810547694, 120.63562554032075], [28.04913010225546, 120.61905383269558]]
//						var supermarket = [[27.995901757663383, 120.70184684673825], [28.003383837429848, 120.70217834297064], [28.00481572156556, 120.70257756680591], [28.00243162438752, 120.70839622170452], [28.01243655199432, 120.69356490427887], [28.019966216632756, 120.68622040422679], [28.013660850935683, 120.68321540565435], [28.012389038341162, 120.68763841127013], [28.005866707969872, 120.6715035159207], [28.00931895762975, 120.66949252751166], [28.02081854803789, 120.66322931057785], [28.02192275544375, 120.66083977637405], [28.010629408563034, 120.6643254538739], [28.00909869136968, 120.66160350242954], [28.012944260263613, 120.6575468800902], [28.01468748263837, 120.65313937160539], [28.022596641639787, 120.6515478196274], [28.027219470242304, 120.65920443746572], [28.01102601932884, 120.64394744816613], [27.993288162383504, 120.65029346685077], [27.993125699657583, 120.66014996608604], [27.991654540142356, 120.6652207850599], [27.990615047961857, 120.64490763816859], [27.98745686044128, 120.63785080589979], [28.001200651335733, 120.63976959317245], [28.00954542320972, 120.63933701129652], [28.011841486514292, 120.61702062189134], [28.015165171416736, 120.60742687811911], [28.014164121751048, 120.60307422460748], [28.02296460430949, 120.6048037968155], [28.020644792906793, 120.60039187933258], [28.021717230203045, 120.59602283787342], [28.009577754919345, 120.6003694869717], [27.979959334635463, 120.71438824431087], [27.9746985112832, 120.67848122397636], [27.9802981423626, 120.67621819615626], [27.985294144316, 120.67540067944395], [27.966792859085118, 120.67123741932119], [27.963388938690752, 120.66383267590682], [27.960141253142385, 120.65727735659134], [27.97433258426462, 120.65645280242322], [27.958388317423925, 120.65158709769153], [27.975902247387065, 120.62978257248707], [27.99701009760024, 120.63571268980878], [28.01106342633189, 120.63259811531177], [27.992996714840164, 120.62533374324401], [27.984133804338455, 120.61379773940702], [27.985649631567757, 120.61768227011946], [27.99089114176817, 120.61256532003583], [27.995953987521855, 120.58993256997718], [27.996579775544937, 120.56884123223548], [27.983009030606166, 120.56567380510853], [27.963880623458664, 120.58387329177535], [27.959909931622686, 120.61005359860181], [27.960711641892473, 120.61155529358349], [27.9486552109937, 120.61485159048934], [27.994061534510575, 120.70953972935064], [27.98881013080287, 120.70719677851056], [27.98942985861456, 120.7129455904997], [27.98710042614762, 120.70944007242142], [27.982449515711888, 120.71974236124353], [27.983515244557758, 120.71612925178162], [27.991735632125618, 120.72018205201212], [27.98109859449376, 120.72971179973808], [27.986928085153643, 120.7329186961085], [27.9744527908769, 120.73792740392695], [27.973105860442, 120.74179867024505], [27.97363908017062, 120.74395260632959], [27.97684516858386, 120.74664490283523], [27.973120907245654, 120.75851675569567], [27.968299783959555, 120.78246156109896], [27.963872952877225, 120.79561312365843], [27.940759253726178, 120.78127525626276], [27.933375966273342, 120.76835021103246], [27.923909585944003, 120.80612395054979], [27.92429818083765, 120.81238040684524], [27.92959074040117, 120.81350260968773], [27.93004291717063, 120.82633337713291], [27.919146152605208, 120.82867578761486], [27.90139221572002, 120.81628434731655]]
//						var bank = [[27.972374260468147, 120.6694338601028], [27.988467834914665, 120.62334769661862], [27.987735077625352, 120.63859488640352], [27.974535883035447, 120.71061841089103], [27.98613229604878, 120.68244700412278], [27.957709105873334, 120.65242448366308], [27.99587137029303, 120.57046458172339], [27.984992144892352, 120.53461366012472], [27.972848859114354, 120.6803489686441], [27.992787452512854, 120.60437345903203], [28.01046751726486, 120.63485917144205], [27.99383480293931, 120.62724194882868], [28.007518290258, 120.63445541769927], [28.006872580748183, 120.66366715217644], [28.014168407912408, 120.66090480812129], [27.991082457694624, 120.66106645973588], [27.994626649161102, 120.67888200097863], [28.01423634139975, 120.59767393668567], [27.997638742482337, 120.6787008244128], [28.02167804648725, 120.60504602500289], [28.02471489299877, 120.66869106533962], [28.003247957716916, 120.69827097918021], [28.007899600461712, 120.69037905636104], [27.991060701212476, 120.675118156262], [27.988344513213274, 120.68160917042314], [28.007004247428362, 120.64487784006717], [28.025804109300235, 120.64263435144969], [28.021301331091074, 120.67231160095469], [28.00241463201958, 120.7017503340886], [28.002682950099302, 120.68254891340968], [28.020757038060303, 120.6613103082284], [28.01653056744859, 120.63213319138937], [28.016718910120222, 120.62307441693605], [28.003573754837515, 120.64404762103085], [28.015928636231617, 120.68336467544108], [27.995617984495844, 120.67624177045077], [28.007657414213003, 120.71649433677798], [28.01200568764606, 120.67292839725093], [28.011220661324945, 120.6220295397591], [28.002723320897413, 120.71209624091786], [28.027074298549543, 120.65761550856709], [28.02323355110982, 120.63133390859402], [28.005139450632726, 120.70816043207877], [28.017402765763823, 120.64785208432876], [27.985430306358037, 120.66130131361429], [28.010184069768616, 120.64098438047601], [28.009868353786775, 120.66912359477458], [27.995481416173867, 120.67180687424857], [28.001310122602263, 120.64900658410174], [28.00490186494188, 120.6493837751735], [28.011504551359003, 120.65151726115958], [28.010517105057275, 120.66174337925717], [28.015846725279957, 120.65297078363993], [28.003934489767605, 120.65425460164305], [27.989614724384065, 120.70645312394137], [27.990129281953468, 120.71286446898516], [27.92358601694401, 120.81005162788098], [27.970398201309436, 120.73943679199301], [27.972658864402405, 120.72620330178151], [27.976968650833935, 120.74714264706947], [27.92268279744333, 120.82546762855397], [27.992486586114662, 120.72524670106206], [27.972565555068616, 120.75875261840008], [27.992894001750248, 120.70779231871201]]
						poilist = [[[28.02413714933647, 120.59231042225338], [28.015934899920968, 120.59315026941096], [28.017598397231286, 120.62720196345933], [28.009579342593884, 120.62550163098484], [28.004809263717274, 120.6377347358212], [28.000074927774197, 120.64247435857678], [27.992482860393906, 120.61876601277979], [27.992104445387593, 120.60749471675399], [27.993834499500956, 120.59902840873255], [27.9983632248212, 120.57988691256617], [28.001944474596744, 120.53743200927599], [27.999633509627124, 120.52437863104052], [27.978214046777026, 120.60770144869474], [27.955071352120193, 120.65266490834357], [27.9653176851755, 120.64911771368132], [27.986462823349424, 120.65501696595717], [27.997350447524123, 120.65502095445483], [28.01347812138269, 120.66705297980423], [28.015035095719373, 120.66924746435298], [28.019297316444796, 120.68774780687814], [28.01771443723763, 120.70621800507885], [28.00767663671109, 120.69690530221277], [28.002598635672513, 120.68419684673563], [27.986642698545882, 120.6745876857921], [27.984271931841366, 120.70085525943868], [27.984697329417944, 120.70832005502233], [27.984097330201774, 120.7399269765568], [27.97572205516592, 120.73910976819276], [27.971630382870295, 120.75580264582993], [27.971289933938486, 120.76749069435073], [27.965601668324616, 120.79305442831875], [27.95561947468276, 120.77686008455481], [27.925200486519664, 120.8020982668211], [27.936241159392875, 120.83517768317648], [27.919759447346674, 120.82837010165798], [27.956276440370928, 120.68327601200721], [27.92890669681355, 120.67737355861688], [27.936301398217683, 120.68736750050368], [28.038314802127122, 120.65582024743188], [28.04926515433207, 120.660035441963], [28.05608810547694, 120.63562554032075], [28.04913010225546, 120.61905383269558]], [[27.995901757663383, 120.70184684673825], [28.003383837429848, 120.70217834297064], [28.00481572156556, 120.70257756680591], [28.00243162438752, 120.70839622170452], [28.01243655199432, 120.69356490427887], [28.019966216632756, 120.68622040422679], [28.013660850935683, 120.68321540565435], [28.012389038341162, 120.68763841127013], [28.005866707969872, 120.6715035159207], [28.00931895762975, 120.66949252751166], [28.02081854803789, 120.66322931057785], [28.02192275544375, 120.66083977637405], [28.010629408563034, 120.6643254538739], [28.00909869136968, 120.66160350242954], [28.012944260263613, 120.6575468800902], [28.01468748263837, 120.65313937160539], [28.022596641639787, 120.6515478196274], [28.027219470242304, 120.65920443746572], [28.01102601932884, 120.64394744816613], [27.993288162383504, 120.65029346685077], [27.993125699657583, 120.66014996608604], [27.991654540142356, 120.6652207850599], [27.990615047961857, 120.64490763816859], [27.98745686044128, 120.63785080589979], [28.001200651335733, 120.63976959317245], [28.00954542320972, 120.63933701129652], [28.011841486514292, 120.61702062189134], [28.015165171416736, 120.60742687811911], [28.014164121751048, 120.60307422460748], [28.02296460430949, 120.6048037968155], [28.020644792906793, 120.60039187933258], [28.021717230203045, 120.59602283787342], [28.009577754919345, 120.6003694869717], [27.979959334635463, 120.71438824431087], [27.9746985112832, 120.67848122397636], [27.9802981423626, 120.67621819615626], [27.985294144316, 120.67540067944395], [27.966792859085118, 120.67123741932119], [27.963388938690752, 120.66383267590682], [27.960141253142385, 120.65727735659134], [27.97433258426462, 120.65645280242322], [27.958388317423925, 120.65158709769153], [27.975902247387065, 120.62978257248707], [27.99701009760024, 120.63571268980878], [28.01106342633189, 120.63259811531177], [27.992996714840164, 120.62533374324401], [27.984133804338455, 120.61379773940702], [27.985649631567757, 120.61768227011946], [27.99089114176817, 120.61256532003583], [27.995953987521855, 120.58993256997718], [27.996579775544937, 120.56884123223548], [27.983009030606166, 120.56567380510853], [27.963880623458664, 120.58387329177535], [27.959909931622686, 120.61005359860181], [27.960711641892473, 120.61155529358349], [27.9486552109937, 120.61485159048934], [27.994061534510575, 120.70953972935064], [27.98881013080287, 120.70719677851056], [27.98942985861456, 120.7129455904997], [27.98710042614762, 120.70944007242142], [27.982449515711888, 120.71974236124353], [27.983515244557758, 120.71612925178162], [27.991735632125618, 120.72018205201212], [27.98109859449376, 120.72971179973808], [27.986928085153643, 120.7329186961085], [27.9744527908769, 120.73792740392695], [27.973105860442, 120.74179867024505], [27.97363908017062, 120.74395260632959], [27.97684516858386, 120.74664490283523], [27.973120907245654, 120.75851675569567], [27.968299783959555, 120.78246156109896], [27.963872952877225, 120.79561312365843], [27.940759253726178, 120.78127525626276], [27.933375966273342, 120.76835021103246], [27.923909585944003, 120.80612395054979], [27.92429818083765, 120.81238040684524], [27.92959074040117, 120.81350260968773], [27.93004291717063, 120.82633337713291], [27.919146152605208, 120.82867578761486], [27.90139221572002, 120.81628434731655]], [[27.972374260468147, 120.6694338601028], [27.988467834914665, 120.62334769661862], [27.987735077625352, 120.63859488640352], [27.974535883035447, 120.71061841089103], [27.98613229604878, 120.68244700412278], [27.957709105873334, 120.65242448366308], [27.99587137029303, 120.57046458172339], [27.984992144892352, 120.53461366012472], [27.972848859114354, 120.6803489686441], [27.992787452512854, 120.60437345903203], [28.01046751726486, 120.63485917144205], [27.99383480293931, 120.62724194882868], [28.007518290258, 120.63445541769927], [28.006872580748183, 120.66366715217644], [28.014168407912408, 120.66090480812129], [27.991082457694624, 120.66106645973588], [27.994626649161102, 120.67888200097863], [28.01423634139975, 120.59767393668567], [27.997638742482337, 120.6787008244128], [28.02167804648725, 120.60504602500289], [28.02471489299877, 120.66869106533962], [28.003247957716916, 120.69827097918021], [28.007899600461712, 120.69037905636104], [27.991060701212476, 120.675118156262], [27.988344513213274, 120.68160917042314], [28.007004247428362, 120.64487784006717], [28.025804109300235, 120.64263435144969], [28.021301331091074, 120.67231160095469], [28.00241463201958, 120.7017503340886], [28.002682950099302, 120.68254891340968], [28.020757038060303, 120.6613103082284], [28.01653056744859, 120.63213319138937], [28.016718910120222, 120.62307441693605], [28.003573754837515, 120.64404762103085], [28.015928636231617, 120.68336467544108], [27.995617984495844, 120.67624177045077], [28.007657414213003, 120.71649433677798], [28.01200568764606, 120.67292839725093], [28.011220661324945, 120.6220295397591], [28.002723320897413, 120.71209624091786], [28.027074298549543, 120.65761550856709], [28.02323355110982, 120.63133390859402], [28.005139450632726, 120.70816043207877], [28.017402765763823, 120.64785208432876], [27.985430306358037, 120.66130131361429], [28.010184069768616, 120.64098438047601], [28.009868353786775, 120.66912359477458], [27.995481416173867, 120.67180687424857], [28.001310122602263, 120.64900658410174], [28.00490186494188, 120.6493837751735], [28.011504551359003, 120.65151726115958], [28.010517105057275, 120.66174337925717], [28.015846725279957, 120.65297078363993], [28.003934489767605, 120.65425460164305], [27.989614724384065, 120.70645312394137], [27.990129281953468, 120.71286446898516], [27.92358601694401, 120.81005162788098], [27.970398201309436, 120.73943679199301], [27.972658864402405, 120.72620330178151], [27.976968650833935, 120.74714264706947], [27.92268279744333, 120.82546762855397], [27.992486586114662, 120.72524670106206], [27.972565555068616, 120.75875261840008], [27.992894001750248, 120.70779231871201]]]
						let color = ['black', 'yellow', 'green'], poiurl1 = ['img/gasstation1.png', 'img/supermarket1.png', 'img/bank1.png'], poiurl2 = ['img/gasstation2.png', 'img/supermarket2.png', 'img/bank2.png'], poiurlexample = ['img/gasstation3.png', 'img/supermarket3.png', 'img/bank3.png']
						if(zz.length != 0){
							for(var i = 0; i<zz.length; i++){
						        L.marker(latlngtran.wgs84togcj02(poilist[poiset[i]][zz[zz.length-i-1]]), {icon: Icon(poiurl1[poiset[i]], 'markerpoi1')}).addTo(map);
						        L.marker(latlngtran.wgs84togcj02(poilist[poiset[i]][zz1[zz1.length-i-1]]), {icon: Icon(poiurl2[poiset[i]], 'markerpoi2')}).addTo(map);
							}
						}
						L.polyline([[parseFloat(o1.substring(0, 10)), parseFloat(o1.substring(11, o1.length))], latlngtran.wgs84togcj02(road_point_list[xx[0]])], {color: 'blue', opacity: 1, weight: jj, className: 'road'}).addTo(map);
						L.polyline([[parseFloat(d1.substring(0, 10)), parseFloat(d1.substring(11, o1.length))], latlngtran.wgs84togcj02(road_point_list[xx[1]])], {color: 'blue', opacity: 1, weight: jj, className: 'road'}).addTo(map);
						let a = String(distime[0]).substring(0, 5), b = String(distime[1]).substring(0, 5), a1 = String(distime1[0]).substring(0, 5), b1 = String(distime1[1]).substring(0, 5);
						$("#plan1 .pp1").html("color : red");
						$("#plan1 .pp2").html("distance : "+a+" km");
						$("#plan1 .pp3").html("time cost : "+b+" min");
						$("#plan2 .pp1").html("color : green");
						$("#plan2 .pp2").html("distance : "+a1+" km");
						$("#plan2 .pp3").html("time cost : "+b1+" min");
						$("#plan1").slideDown(300);
						$("#plan2").slideDown(300);
		  		},
		  				dataType: 'JSON',
				});
		})
		
		$("#searchtaxi").on("click", function(){
			cleantaxi()
			if(mode_flag == 0){
				let date = parseInt($(".D1").val().substring(8, 10))
				var taxiname = $("#se1").val()
				let data = [date, taxiname]
				var jsondata = JSON.stringify(data)
				$.ajax({
				  	type: 'post',
				  	data: jsondata,
				  	url: "http://127.0.0.1:8000/admin/post_view2.0_1_3/",
				  	success: function(result){
				  		drawTrajrect(result.data[0], result.data[1][0], result.data[1][1], result.data[1][2]);
				  		distanceStatistics(result.data[0]);
				  		drawaveragefee(result.data[1][0], result.data[1][1], result.data[1][2], taxiname, result.data[0])
				  		d3.selectAll(".bujuSamep").style("display", "block")
				  		if(mode_flag== 0){
				  			taxi_mode_show_road()
				  		}
			  		},
			  		dataType: 'JSON',
				});
			}
		})
		
		function cleantaxi(){
			avefeedata = []
			avedistencedata = []
			countdata = []
			d3.select(".svg3").remove()
			d3.select(".svg41").remove()
			d3.select(".svg4").remove()
			d3.selectAll(".trip1").remove()
			d3.selectAll(".bujuSamep").style("display", "none")
			d3.selectAll(".circle0").remove();
			d3.selectAll(".haha").remove();
			d3.select(".leaflet-popup").remove();
			d3.select(".trip1").remove();
			d3.select(".road").remove();
		  	$("#show_road_icon").css('display', 'none')
		  	$("#show_road_count").css('display', 'none')
		  	$("#tripinfo").css('display', "none")
		  	for(var j = 0; j<678; j++){
				var A = "road"+(j)
				d3.select('.'+A).remove()		
			}
		}
		function cleantaxi1(){
			d3.selectAll(".road").remove()
			for(var j = 0; j<678; j++){
				var A = "road"+(j)
				d3.select('.'+A).attr("stroke", "none")		
			}
			d3.selectAll(".circle0").remove();
			d3.selectAll(".haha").remove();
			d3.selectAll(".leaflet-popup").remove();
			d3.selectAll(".trip1").remove();
		  	$("#show_road_icon").css('display', 'none')
		  	$("#show_road_count").css('display', 'none')
		}
		
		var gasstationdata = [[28.169990666, 120.70329489], [27.856684582, 120.6721307], [27.86174928, 120.68661499], [27.830599893, 120.68305527], [27.927845105, 120.81263705], [28.089784262, 120.5953401], [28.081805869, 120.59308101], [28.096394614, 120.60814584], [28.103361942, 120.6042404], [28.107300144, 120.60156975], [28.107355369, 120.60161572], [28.099950099, 120.57440933], [28.07597675, 120.61686004], [28.116097039, 120.58203735], [27.795298903, 120.58342427], [27.796188166, 120.58908503], [27.802081133, 120.61940079], [27.798567369, 120.62341171], [27.967616976, 120.65966444], [27.95735873, 120.66321137], [27.950146363, 120.66962463], [27.98875075, 120.66559806], [27.931441918, 120.68791052], [27.989127, 120.685171], [27.760076, 120.619562], [27.753648166, 120.66476024], [27.752831, 120.609536], [27.71969272, 120.62118087], [27.558606807, 120.55089431], [27.559105839, 120.527117], [27.565720489, 120.58117312], [27.889888798, 120.64822539], [28.109173587, 120.96976809], [28.10924811, 120.96927076], [28.087581709, 120.96419557], [28.128485427, 120.99264058], [28.073128709, 120.93087741], [28.069107697, 120.92210485], [28.039591812, 120.92222539], [28.077894911, 120.87899799], [28.075691145, 120.86804697], [28.101399366, 120.88247692], [28.052062427, 120.88179291], [27.779217629, 120.69403553], [27.782858678, 120.67061132], [27.799560744, 120.6869343], [27.797273867, 120.70960232], [28.00201703, 120.53501847], [28.004232482, 120.5480443], [28.001186773, 120.59027525], [28.038938323, 120.49480695], [27.967835998, 120.58175091], [28.040089, 120.853038], [27.787595915, 120.66118506], [27.786724774, 120.64475488], [27.77342029, 120.64757621], [27.666930782, 120.06248377], [27.658521305, 120.04926845], [27.813589935, 120.70133262], [27.827092881, 120.73641025], [28.404960406, 121.21387211], [27.544116263, 120.45127026], [27.548207792, 120.45535569], [27.549802379, 120.45772085], [27.534094, 120.434811], [27.526129113, 120.472667], [27.531868876, 120.42122422], [27.432579056, 120.19039372], [28.138815015, 121.01465537], [28.176931417, 121.02653608], [28.022033901, 120.69829017], [28.010594986, 120.70743557], [28.02076267, 120.71672716], [28.005267582, 120.69475997], [27.671057081, 119.79541324], [27.849924709, 120.51688665], [27.849782382, 120.50761935], [27.782966225, 120.48656012], [27.690495754, 120.5715934], [27.683454536, 120.57149006], [28.028241438, 120.81917995], [27.459827818, 120.62007766], [27.446977945, 120.62711106], [27.495857, 120.56984], [28.16228096, 120.4277654], [28.034362882, 120.82855312], [28.017251186, 120.83677739], [28.040958389, 120.84632941], [27.594164535, 120.52451343], [28.154679234, 120.48968157], [28.14028897, 120.56999994], [28.123948662, 120.57305606], [28.140503533, 120.55107926], [28.121279571, 120.57293353], [28.117158343, 120.57466664], [28.228540376, 121.06166931], [28.208256708, 121.03230449], [28.205822812, 121.03147402], [28.175502888, 121.05571692], [28.034351282, 120.59650703], [28.059369621, 120.5964917], [28.297785446, 121.12823546], [28.296735556, 121.12671974], [28.298927095, 121.12346601], [28.266707208, 121.11013478], [28.05816827, 120.68181731], [28.08233047, 120.69909575], [28.19690873, 120.75793245], [28.196926, 120.758475], [28.244497536, 120.74533703], [27.99963694, 120.66560392], [28.020173803, 120.63764884], [27.819512674, 120.69664313], [27.825868388, 120.7012762], [27.587936299, 120.50387449], [27.514500906, 120.38592812], [27.514858124, 120.38743882], [27.494690203, 120.38290162], [27.518010486, 120.41169207], [27.939257707, 120.84554802], [27.922823851, 120.83895873], [27.922763435, 120.8387641], [28.145732038, 120.51996839], [28.143726857, 120.52219087], [28.142518197, 120.52480177], [27.647065366, 120.35017987], [28.329378782, 120.74854503], [28.053742023, 120.89759467], [27.681969827, 120.6230632], [27.70921637, 120.6621281], [27.986977385, 120.75052249], [27.978616778, 120.74969565], [27.588478814, 120.48843102], [27.574161735, 120.48230882], [27.939037196, 120.69788159], [27.926099147, 120.68234961], [27.958927532, 120.69381378], [28.354256968, 121.14382657], [28.396561824, 121.16320434], [28.404110051, 121.16282111], [28.04311139, 120.71414364], [28.015842222, 120.67763795], [27.55520012, 119.72016326], [27.269447083, 120.45936714], [27.416019724, 120.3722556], [27.918346517, 120.66442918], [27.923745984, 120.6629094], [27.466721173, 120.32498942], [27.45904345, 120.30127804], [28.049683076, 120.98723161], [27.921325658, 120.67606934], [27.627688701, 119.94881813], [27.659559663, 119.8770536], [27.922368822, 120.58776659], [27.940589967, 120.60903299], [27.987773896, 120.71883818], [28.167139044, 120.56324564], [27.840032086, 120.78191939], [27.846336774, 120.78797001], [27.8551746, 120.7181479], [28.098844091, 120.70948781], [27.976862332, 120.87519171], [27.872095202, 120.15941566], [27.874534976, 120.15170766], [28.058511558, 120.64609716], [28.051838567, 120.62943379], [28.423617205, 121.13442883], [28.424034381, 121.1339798], [27.765421646, 120.00122014], [27.924024224, 119.97748284], [27.924736259, 119.97611543], [27.621103383, 120.55864792], [27.625572999, 120.56251242], [27.612697767, 120.54935399], [27.600614186, 120.55371397], [27.638827233, 120.57450803], [27.599479018, 120.52968225], [28.443327357, 120.73489891], [28.14045055, 120.70587184], [28.139014464, 120.70781289], [28.149005456, 120.70122725], [27.995212646, 120.6291791], [27.994989649, 120.61786202], [27.997261297, 120.64026473], [27.981098087, 120.61806276], [27.996774039, 120.6093805], [28.0121877, 120.63594542], [28.007216861, 120.64824935], [28.002424864, 120.65301397], [28.30582969, 121.04058217], [28.292239861, 121.04845961], [27.480425, 120.575352], [28.123210662, 120.57310614], [28.124298134, 120.57249336], [28.017427652, 120.67982979], [28.125976172, 121.00049522], [27.582293394, 120.47443747], [28.018867266, 120.6034924], [28.027063591, 120.60264585], [28.040588846, 120.66637536], [27.934791486, 120.68352131], [27.789150302, 120.11438179], [27.788773276, 120.12251192], [27.806306039, 120.08247088], [28.051552608, 120.67059224], [27.719738688, 120.58304453], [27.730447963, 120.59109054], [28.029818981, 120.78736377], [27.806957578, 120.71683167], [27.81937192, 120.72092372], [27.474507842, 119.88429577], [27.62946932, 120.56643433], [28.088272353, 120.86703121], [27.84293204, 120.75119901], [28.068476042, 120.89253924], [27.767154036, 120.29520502], [27.771374219, 120.31231484], [28.026847126, 120.9020635], [27.602024745, 120.4419306], [27.599865319, 120.4359741], [28.019774863, 120.90252304], [28.050757823, 120.50289858], [28.074789998, 120.52351649], [27.877419623, 121.11640594], [27.745677, 120.135354], [27.834833676, 120.02029459], [27.67093313, 120.07305595], [28.069529936, 120.81660966], [27.98725903, 120.71138025], [27.368698798, 119.9179349], [27.368614737, 119.91788359], [27.392223432, 120.00242969], [27.555301531, 119.74019992], [27.409220375, 120.05748385], [27.555261875, 119.71989894], [28.400114772, 121.20768717], [27.79239, 120.565188], [27.706643939, 120.57625944], [27.591507304, 120.54972948], [27.86514305, 121.07362284], [27.844634905, 121.16511288], [27.848977013, 121.16956396], [27.967908557, 121.09647307], [28.030618303, 120.96976891], [27.99995973, 120.93553939], [27.958008344, 120.78751818], [27.968106159, 120.80366778], [27.972848796, 120.77713098], [27.973722143, 120.77816786], [27.97421736, 120.76645388], [27.885458297, 120.68115146], [27.88505088, 120.65298955], [27.80609, 120.698048], [27.532648199, 120.55481433], [27.498367254, 120.63088784], [28.367007633, 121.14953621], [27.596559981, 120.47379019], [27.592315837, 120.47977412]]
		var bankpoint = [[27.999463, 120.682699], [27.961039, 120.603298], [27.775342, 120.664605], [27.786726, 120.645436], [27.997033, 120.692131], [27.999298, 120.720797], [28.018872, 120.731525], [28.026427, 120.643409], [28.119707, 120.974251], [28.029767, 120.67652], [27.99981, 120.681618], [27.999579, 120.686884], [27.995036, 120.718289], [28.041707, 120.650815], [27.785977, 120.667613], [28.050451, 120.907571], [27.989934, 120.629289], [28.022792, 120.683597], [28.005057, 120.6938], [28.046008, 120.65719], [28.025023, 120.693836], [28.114717, 120.978545], [28.115735, 120.9947], [27.999059, 120.690849], [27.927477, 120.816828], [27.995105, 120.672167], [28.05162, 120.903143], [27.975365, 120.690839], [27.964885, 120.592547], [28.000195, 120.691522], [27.998198, 120.535615], [28.018511, 120.73157], [28.012011, 120.651494], [27.782908, 120.660549], [28.12224, 120.986759], [27.978204, 120.679115], [28.012577, 120.64292], [28.010545, 120.647699], [28.009202, 120.674257], [27.991049, 120.634187], [28.01229, 120.681222], [27.973952, 120.769901], [27.607948, 120.564088], [28.016473, 120.671488], [27.993889, 120.7205], [27.884453, 120.817223], [28.114673, 120.976948], [28.110535, 120.979658], [27.991119, 120.633784], [27.99278, 120.723025], [28.107488, 120.970185], [27.587029, 120.549745], [28.11562, 120.975816], [27.975213, 120.624055], [27.763723, 120.624384], [27.99967, 120.647822], [27.979724, 120.757737], [27.959837, 120.662004], [27.521264, 120.427375], [28.11058, 120.979112], [28.046277, 120.636352], [27.831266, 120.704027], [27.612897, 120.569894], [28.01282, 120.646461], [27.974955, 120.622636], [27.992292, 120.724194], [28.016938, 120.672798], [27.92632, 120.835329], [27.525821, 120.422642], [28.115112, 120.977952], [28.0162, 120.65102], [28.009913, 120.645044], [28.121183, 120.969396], [27.934931, 120.819023], [27.870895, 120.821308], [28.018175, 120.618357], [28.012298, 120.653846], [28.025456, 120.670513], [27.993451, 120.671442], [27.99466, 120.718198], [28.114619, 120.996907], [27.835478, 120.770486], [28.02705, 120.655269], [28.011586, 120.673216], [28.012023, 120.653499], [28.0464, 120.634153], [28.046341, 120.643917], [27.976891, 120.623886], [28.016259, 120.661295], [28.010439, 120.67484], [28.051241, 120.629702], [27.946288, 120.695139], [28.043248, 120.586462], [28.004487, 120.652675], [28.051259, 120.902964], [27.990399, 120.692114], [28.075866, 120.595818], [27.925636, 120.820367], [27.877939, 120.680401], [27.992951, 120.684142], [28.008691, 120.727275], [27.519994, 120.427241], [28.046759, 120.628498], [28.158584, 120.696669], [28.004453, 120.712154], [28.040738, 120.862209], [28.006105, 120.664791], [27.865794, 120.798977], [27.99719, 120.689459], [28.017173, 120.608016], [28.125674, 120.98184], [27.8376, 120.70643], [28.009417, 120.644549], [27.58465, 120.541372], [27.98771, 120.674305], [27.522348, 120.426693], [28.016748, 120.670901], [28.000198, 120.689278], [27.998307, 120.682326], [27.775308, 120.663098], [28.007669, 120.658985], [27.930908, 120.818555], [28.157703, 120.695214], [28.158318, 120.696272], [28.162578, 120.698291], [28.049133, 120.901963], [27.844985, 121.161817], [27.992543, 120.717139], [27.908799, 120.830142], [28.025626, 120.676686], [27.731732, 120.611175], [27.511971, 120.419472], [27.49094, 120.581773], [27.996129, 120.672227], [27.995913, 120.673139], [28.01891, 120.662252], [28.045715, 120.663692], [27.520952, 120.427562], [27.973119, 120.680485], [28.014216, 120.689193], [28.013043, 120.664676], [27.784056, 120.641041], [28.041759, 120.652006], [28.032109, 120.981769], [27.996389, 120.687545], [28.052936, 120.90437], [28.126354, 120.968774], [27.83709, 120.765148], [27.77947, 120.658979], [28.012153, 120.679781], [28.154585, 120.69454], [27.99154, 120.652529], [28.2228, 121.044506], [27.9587, 120.607508], [28.027096, 120.679265], [27.577111, 120.565618], [28.011971, 120.698514], [28.002112, 120.73339], [28.020073, 120.657712], [27.929119, 120.835351], [28.002112, 120.73339], [28.020073, 120.657712], [27.929119, 120.835351], [28.024952, 120.606987], [28.045728, 120.667797], [28.003716, 120.711635], [28.045693, 120.663398], [28.022292, 120.672319], [27.673558, 120.5693], [27.998344, 120.941444], [28.04292, 120.87016], [28.028738, 120.660412], [27.509996, 120.413908], [27.783892, 120.464546], [27.730836, 120.612035], [28.012056, 120.689461], [27.584921, 120.539189], [28.012774, 120.688557], [27.674353, 120.570328], [27.584943, 120.540318], [28.011335, 120.726819], [27.564087, 119.724362], [28.006283, 120.665421], [27.851482, 121.166657], [28.000381, 120.689918], [28.122012, 120.97662], [27.928529, 120.835065], [27.821588, 120.724166], [27.783505, 120.670593], [28.016657, 120.661627], [28.050943, 120.905495], [27.999225, 120.682864], [28.026083, 120.656311], [28.032351, 120.981291], [27.923537, 120.834672], [28.118626, 120.97496], [28.01861, 120.647621], [28.044535, 120.900434], [27.985976, 120.725848], [28.122828, 120.980948], [28.025731, 120.673217], [27.993554, 120.685702], [28.015505, 120.667212], [28.049639, 120.902222], [27.576172, 120.479302], [27.788533, 120.463309], [27.976167, 120.75861], [28.005432, 120.719253], [27.976823, 120.623914], [28.01823, 120.675487], [27.997864, 120.682464], [27.783411, 120.65458], [28.107803, 120.971053], [27.995682, 120.735956], [28.103219, 120.971075], [28.005996, 120.702135], [28.013814, 120.647762], [28.042595, 120.657686], [28.000251, 120.721211], [28.173847, 120.487026], [27.992877, 120.655524], [28.012706, 120.672553], [28.050252, 120.874958], [28.026464, 120.675286], [27.916211, 120.834692], [28.123716, 120.979127], [28.028144, 120.653156], [27.819667, 120.721948], [27.995868, 120.682362], [27.785884, 120.640628], [28.018606, 120.658574], [27.998984, 120.684255], [27.980124, 120.643953], [28.025521, 120.642356], [27.598219, 120.564162], [27.79346, 120.559896], [28.005939, 120.722875], [28.005906, 120.698737], [27.785472, 120.640019], [28.046394, 120.634707], [28.023728, 120.61498], [27.977623, 120.66977], [28.016989, 120.648925], [27.586755, 120.561375], [27.775583, 120.671919], [28.127564, 120.970596], [28.005318, 120.693116], [28.221711, 121.046056], [28.279948, 121.113367], [27.803543, 120.707379], [27.66996, 120.568812], [28.023062, 120.671888], [27.997141, 120.692464], [27.517216, 120.41496], [28.019879, 120.615641], [27.679681, 120.572271], [28.019021, 120.642609], [27.517514, 120.415191], [28.017127, 120.672003], [28.018205, 120.612619], [28.042813, 120.860623], [27.988911, 120.692032], [28.341795, 120.743974], [28.079898, 120.69992], [28.005907, 120.654593], [28.018576, 120.693921], [28.01359, 120.63339], [27.992716, 120.724496], [28.010768, 120.727014], [28.412478, 121.161333], [28.005645, 120.654062], [27.9992, 120.686989], [28.045598, 120.63098], [28.007996, 120.678751], [28.015189, 120.651982], [27.606299, 120.560064], [28.015632, 120.699516], [28.014108, 120.663277], [28.01256, 120.642066], [28.019683, 120.663829], [28.067972, 120.594575], [27.44018, 120.625323], [27.765677, 120.648227], [28.023544, 120.615565], [28.000821, 120.732779], [28.223457, 121.045608], [27.916014, 120.834562], [28.217499, 121.042203], [28.01107, 120.70043], [28.222322, 121.045383], [27.994757, 120.730581], [28.04232, 120.655947], [28.01767, 120.684039], [27.819592, 120.721617], [28.221049, 121.046398], [28.089418, 120.550612], [27.898425, 120.645722], [28.053453, 120.905725], [28.014456, 120.683509], [28.01751, 120.671404], [27.977074, 120.770417], [28.006297, 120.722076], [28.01937, 120.643157], [27.517507, 120.414665], [28.018547, 120.634037], [28.01389, 120.632453], [28.027097, 120.671643], [28.042735, 120.860546], [28.013475, 120.661129], [28.168428, 120.490541], [28.014382, 120.66539], [27.977425, 120.601487], [27.786164, 120.647859], [27.999281, 120.71733], [28.0468, 120.633098], [28.012184, 120.675174], [28.015377, 120.670351], [28.024656, 120.681016], [28.042315, 120.656734], [27.98906, 120.688069], [28.013658, 120.662047], [28.012978, 120.676317], [28.005823, 120.722615], [28.018598, 120.689293], [27.993063, 120.723674], [28.008079, 120.674698], [27.928116, 120.835075], [28.006029, 120.709275], [28.013121, 120.665595], [28.171567, 120.488405], [28.057521, 120.614885], [27.925982, 120.820368], [28.125991, 120.977226], [28.115515, 120.994882], [27.911298, 120.818448], [27.998423, 120.694366], [27.609442, 120.568284], [28.047874, 120.903195], [27.986195, 120.726354], [28.159735, 120.699544], [28.048975, 120.668456], [28.008363, 120.727315], [27.995324, 120.691341], [27.996936, 120.736577], [28.021465, 120.668811], [27.978006, 120.759062], [27.93846, 120.806274], [28.012787, 120.659485], [28.013933, 120.693235], [27.932988, 120.823549], [28.031294, 120.796616], [27.576077, 120.480241], [27.962726, 120.591829], [27.702121, 120.659004], [27.863414, 120.797293], [28.011266, 120.649322], [27.986966, 120.715688], [27.585094, 120.55963], [28.029357, 120.668183], [27.989073, 120.625332], [28.045895, 120.648501], [27.948892, 120.842303], [27.994981, 120.735044], [27.990421, 120.720908], [27.990566, 120.651828], [28.017425, 120.682993], [28.003993, 120.650903], [28.051121, 120.91347], [28.005416, 120.709491], [28.118452, 120.974165], [28.060989, 120.614701], [28.020042, 120.65913], [27.936004, 120.814145], [28.031354, 120.793802], [28.017584, 120.683643], [28.011161, 120.643132], [28.018952, 120.65645], [28.409652, 121.167304], [27.91471, 120.835102], [28.019149, 120.669056]]
		var supermarket1 = [[27.995017, 120.64746], [27.988793, 120.686661], [27.976956, 120.661152], [27.988548, 120.694158], [27.989312, 120.688485], [27.987453, 120.688824], [28.014698, 120.64186], [27.989866, 120.648367], [27.988757, 120.6932], [27.986897, 120.687794], [27.988664, 120.688147], [27.986711, 120.688871], [28.043368, 120.587556], [28.011061, 120.698949], [28.01553, 120.663347], [28.023373, 120.68385], [28.038696, 120.586135], [28.042053, 120.58172], [28.043517, 120.586353], [28.040083, 120.589048], [28.011956, 120.653996], [28.038881, 120.589764], [28.027182, 120.623212], [28.018142, 120.707042], [27.998791, 120.692636], [28.021066, 120.642601], [28.029394, 120.586664], [28.011302, 120.649175], [28.038623, 120.585529], [28.04917, 120.596856], [28.034221, 120.600142], [27.995862, 120.663863], [28.013111, 120.665534], [28.039311, 120.591169], [28.088536, 120.550257], [28.042099, 120.576956], [27.989884, 120.678347], [28.00237, 120.69227], [28.068049, 120.58175], [28.026471, 120.598287], [27.9905, 120.690465], [28.02358, 120.677608], [28.048148, 120.585812], [28.006718, 120.696756], [28.017862, 120.608396], [28.01708, 120.613422], [28.027218, 120.590478], [28.043879, 120.596575], [28.022859, 120.671957], [28.017576, 120.658938], [28.039602, 120.597802], [28.019199, 120.674941], [28.019199, 120.674941], [28.038099, 120.599811], [28.039134, 120.583855], [28.040019, 120.583009], [28.025002, 120.652395], [28.01084, 120.679667], [28.019341, 120.664646], [27.995431, 120.670741], [28.017385, 120.669828], [27.988548, 120.694158], [28.068656, 120.518142], [27.999386, 120.686139], [28.024021, 120.673641], [28.041053, 120.579392], [28.019671, 120.674812], [28.022545, 120.66029], [28.020353, 120.636793], [28.00879, 120.720786], [28.022181, 120.621945], [27.986309, 120.661596], [28.015081, 120.728286], [27.990142, 120.698815], [28.039456, 120.591685], [28.081511, 120.59723], [28.08701, 120.598183], [28.01803, 120.693732], [28.045946, 120.578336], [28.018235, 120.608674], [28.021829, 120.625376], [28.024767, 120.588388], [28.02212, 120.725411], [28.008356, 120.693208], [28.002839, 120.715327], [28.016009, 120.660719], [28.027301, 120.651727], [28.046171, 120.584295], [27.995582, 120.660864], [28.088192, 120.598552], [28.007824, 120.7131], [28.035446, 120.603495], [27.997254, 120.689645], [28.029944, 120.610176], [28.100503, 120.556906], [28.011367, 120.670326], [28.02702, 120.59154], [28.013034, 120.60785], [27.996585, 120.68568], [28.100286, 120.557744], [28.038883, 120.596746], [28.020974, 120.691962], [28.016306, 120.693774], [28.003782, 120.667082], [28.035328, 120.592537], [28.014864, 120.618574], [28.048107, 120.584316], [28.093824, 120.5718], [28.048069, 120.597477], [28.104516, 120.593876], [28.023954, 120.651988], [28.137779, 120.489435], [28.000241, 120.690563], [28.016969, 120.663709], [28.007887, 120.712341], [28.014595, 120.627418], [28.02534, 120.650997], [28.045085, 120.598481], [28.083218, 120.597239], [28.044285, 120.586293], [28.024408, 120.675582], [28.027076, 120.650646], [28.039416, 120.59794], [27.998801, 120.692626], [27.995547, 120.688203], [28.01051, 120.629432], [28.092062, 120.515421], [28.013358, 120.654488], [28.073998, 120.512582], [27.99612, 120.685167], [27.990991, 120.657392], [28.072315, 120.515022], [28.026192, 120.59796], [28.023423, 120.653655], [28.023515, 120.642672], [28.01411, 120.662641], [28.027975, 120.671447], [28.028797, 120.60449], [27.992943, 120.655458], [28.026712, 120.611506], [28.024652, 120.606358], [28.01044, 120.770872], [28.041346, 120.584605], [28.02536, 120.612979], [28.007286, 120.678245], [28.079704, 120.596818], [27.976956, 120.661152], [28.016611, 120.610064], [28.095406, 120.565661], [27.99116, 120.711873], [28.041905, 120.580994], [28.011926, 120.599805], [28.011926, 120.599805], [27.999302, 120.684204], [28.049709, 120.586008], [28.026792, 120.623458], [28.068829, 120.518597], [28.014988, 120.683465], [28.025232, 120.615753], [28.039622, 120.592843], [28.022148, 120.616545], [28.020733, 120.620507], [28.0277, 120.605205], [28.027083, 120.598211], [28.010687, 120.67939], [28.013532, 120.649527], [28.021949, 120.61655], [28.085352, 120.543994], [28.066487, 120.515245], [28.088569, 120.555798], [27.997692, 120.669872], [28.013585, 120.669484], [28.018612, 120.656044], [28.027584, 120.586675], [28.02206, 120.617138], [28.017485, 120.631247], [28.058835, 120.595864], [28.015613, 120.663653], [28.065299, 120.582456], [28.027118, 120.584898], [28.026186, 120.60502], [27.984984, 120.658793], [27.988757, 120.6932], [27.986471, 120.668324], [28.013159, 120.725029], [28.03271, 120.587858], [28.027186, 120.584498], [28.067218, 120.594265], [28.012565, 120.697371], [28.019509, 120.635836], [28.088522, 120.600013], [28.033817, 120.590229], [28.003924, 120.653687], [27.996276, 120.687549], [28.024224, 120.671416], [27.993939, 120.671873], [27.992942, 120.666221], [28.027354, 120.588376], [28.0868, 120.598845], [28.100577, 120.54713], [28.012509, 120.610717], [28.015301, 120.619706], [28.015166, 120.666472], [28.057773, 120.596826], [28.000931, 120.692148], [28.020291, 120.605697], [28.087515, 120.59546], [28.015374, 120.66517], [28.022981, 120.726698], [28.04107, 120.577563], [28.025234, 120.676281], [28.017145, 120.661996], [28.023498, 120.606028], [28.007119, 120.651843], [28.004223, 120.68911], [28.050405, 120.599021], [27.994366, 120.680526], [28.024878, 120.662106], [27.998902, 120.712373], [27.994003, 120.675814], [28.093848, 120.515625], [28.018737, 120.667926], [28.039464, 120.597717], [28.011717, 120.680079], [28.04882, 120.597164], [28.00813, 120.686276], [28.02434, 120.684071], [28.066499, 120.593448], [27.991866, 120.673738], [28.003582, 120.650296], [28.021646, 120.619658], [27.982843, 120.658373], [28.025798, 120.592284], [28.026541, 120.620214], [28.04453, 120.590652], [28.019757, 120.609984], [28.008708, 120.709487], [28.045178, 120.59826], [28.085397, 120.596451], [28.032549, 120.59221], [28.090757, 120.557586], [27.999154, 120.659987], [28.019696, 120.676915], [28.020091, 120.635762], [28.005506, 120.718915], [28.006387, 120.712702], [28.010579, 120.657735], [28.008559, 120.701116], [28.045079, 120.597359], [28.01539, 120.671859], [28.003549, 120.711042], [28.012317, 120.600952], [28.026691, 120.590537], [28.01699, 120.610667], [28.050487, 120.598898], [28.021813, 120.617992], [27.999474, 120.690274], [28.077483, 120.597128], [28.010215, 120.598431], [28.022671, 120.696766], [28.000117, 120.661569], [27.994632, 120.665747], [28.071241, 120.514081], [27.999345, 120.650498], [28.015177, 120.690866], [28.030212, 120.585441], [28.003469, 120.688932], [28.042739, 120.591535], [28.027885, 120.587028], [28.017635, 120.593522], [28.09958, 120.542475], [28.042617, 120.579163], [28.052525, 120.597578], [28.136492, 120.498001], [28.030179, 120.584346], [28.077641, 120.595454], [28.055137, 120.59546], [28.085252, 120.543843], [28.022337, 120.620721], [27.993464, 120.68313], [28.02771, 120.611293], [28.017149, 120.633381], [28.072939, 120.59762], [28.029509, 120.669774], [28.008296, 120.68209], [28.018045, 120.617784], [28.050038, 120.598272], [28.031884, 120.587568], [28.001185, 120.688016], [28.005473, 120.678806], [28.032137, 120.603691], [28.040286, 120.586972], [28.011381, 120.60586], [28.136386, 120.556363], [28.049105, 120.598154], [28.038891, 120.589873], [28.008718, 120.720316], [28.015126, 120.698187], [28.015292, 120.704099], [28.021867, 120.701619], [28.019359, 120.676916], [28.016527, 120.696986], [28.008643, 120.709866], [27.989201, 120.698377], [27.988947, 120.693033], [28.019401, 120.636137], [28.012982, 120.673105], [28.023139, 120.673808], [28.019509, 120.635836], [28.009747, 120.659714], [28.010771, 120.667999], [28.019652, 120.635872], [28.0292, 120.66463], [28.015232, 120.668127], [28.00553, 120.648963], [28.017281, 120.632859], [28.024307, 120.666214], [28.019401, 120.636137], [28.01959, 120.662558], [28.005649, 120.669012], [28.024675, 120.668503], [28.020127, 120.635598], [28.019865, 120.635858], [28.025566, 120.586695], [28.031651, 120.587445], [28.027374, 120.586151], [28.013998, 120.60738], [28.023572, 120.61073], [27.991755, 120.654379], [28.038894, 120.584913], [28.041181, 120.578712], [28.12843, 120.488973], [28.071652, 120.596622], [28.008852, 120.72023], [28.017018, 120.70971], [28.012964, 120.674913], [27.995941, 120.689638], [28.000583, 120.682895], [28.019876, 120.674899], [27.990683, 120.69537], [27.992878, 120.697291], [28.017867, 120.636168], [28.020012, 120.63505], [28.016983, 120.664225], [28.005524, 120.64938], [28.013523, 120.672582], [28.015856, 120.632245], [28.013504, 120.657355], [28.019845, 120.648849], [28.009101, 120.653951], [28.000504, 120.651663], [28.023521, 120.643041], [28.006316, 120.652657], [28.019804, 120.63541], [28.01528, 120.664632], [28.01193, 120.649857], [28.000504, 120.651663], [28.01141, 120.672191], [28.000463, 120.651306], [28.000163, 120.652316], [28.02094, 120.666963], [28.028639, 120.613064], [28.023719, 120.612988], [28.031053, 120.586615], [28.026413, 120.587374], [28.02729, 120.59787], [28.027593, 120.586695], [28.028727, 120.613617], [28.032236, 120.588202], [28.025865, 120.615147], [28.011813, 120.605922], [28.032336, 120.592929], [28.019956, 120.62026], [28.009087, 120.601984], [27.985749, 120.659394], [27.980398, 120.660984], [28.098724, 120.542502], [28.088567, 120.558582], [28.099503, 120.543374], [28.047805, 120.583811], [28.041267, 120.5802], [28.068169, 120.517429], [28.072731, 120.515378], [28.139044, 120.492617], [28.082956, 120.599585], [28.040443, 120.600305], [28.049487, 120.59814], [28.039887, 120.599622], [28.006934, 120.724488], [28.015178, 120.727252], [28.007239, 120.724441]]
		var supermarket2 = [[27.926003, 120.710591], [27.981825, 120.705876], [27.937635, 120.676992], [27.951812, 120.679313], [27.967634, 120.611591], [27.975698, 120.612063], [27.955914, 120.676683], [27.990039, 120.544622], [27.999002, 120.610289], [27.93466, 120.598899], [27.955821, 120.676468], [27.958588, 120.675075], [27.972743, 120.683541], [27.969221, 120.681809], [27.947747, 120.676077], [27.954367, 120.615584], [27.993673, 120.537546], [27.967483, 120.597863], [27.981296, 120.643645], [27.982544, 120.681185], [27.951995, 120.628097], [27.963323, 120.676543], [27.962767, 120.620404], [27.885642, 120.684633], [27.899999, 120.645008], [27.994358, 120.580412], [27.972593, 120.683417], [27.926977, 120.687326], [27.954763, 120.616046], [27.995182, 120.617172], [27.974946, 120.690913], [27.862077, 120.666425], [27.97429, 120.68738], [27.982896, 120.552006], [27.96932, 120.579149], [27.864212, 120.678153], [27.984265, 120.57221], [27.977393, 120.614743], [27.927194, 120.687142], [27.998997, 120.612469], [27.908576, 120.644862], [27.990774, 120.54215], [27.976623, 120.667028], [27.933815, 120.686582], [27.996611, 120.611999], [27.957905, 120.67564], [27.960101, 120.669518], [27.865325, 120.661417], [27.918581, 120.709322], [27.957743, 120.678454], [27.983071, 120.724905], [27.998669, 120.596045], [27.967338, 120.603428], [27.934576, 120.688729], [27.935774, 120.68947], [27.957085, 120.611419], [27.968709, 120.688856], [27.995577, 120.577246], [27.972827, 120.680316], [27.997834, 120.538352], [27.979074, 120.720009], [27.978895, 120.603363], [27.87819, 120.681675], [27.960726, 120.636814], [27.962461, 120.605712], [27.948856, 120.680465], [27.99948, 120.537329], [27.971262, 120.663351], [27.937315, 120.676813], [27.963983, 120.672925], [27.988091, 120.545199], [27.981434, 120.570173], [27.982812, 120.720163], [27.948493, 120.675431], [27.962055, 120.618187], [27.868219, 120.675393], [27.964188, 120.603049], [27.875636, 120.65809], [27.981527, 120.570919], [27.948565, 120.603671], [27.957808, 120.67824], [28.030349, 120.416563], [27.978138, 120.563197], [27.949546, 120.575927], [27.978409, 120.680255], [27.952143, 120.627819], [27.865246, 120.663669], [27.979391, 120.55876], [27.990468, 120.554366], [27.952894, 120.655589], [27.949795, 120.653541], [27.982487, 120.677554], [27.963994, 120.602603], [28.003147, 120.593389], [27.927404, 120.713916], [27.860227, 120.677304], [27.998819, 120.543912], [27.944274, 120.590691], [27.95256, 120.628419], [27.9531, 120.556646], [27.935556, 120.597851], [28.042396, 120.501778], [27.97798, 120.60437], [27.977463, 120.721276], [27.920445, 120.699447], [27.958276, 120.677663], [27.973758, 120.688145], [27.975589, 120.685854], [27.952139, 120.670325], [27.884191, 120.681333], [27.949597, 120.665521], [27.917136, 120.670388], [27.880456, 120.654877], [28.000402, 120.547316], [27.996406, 120.606166], [27.87705, 120.680664], [27.923149, 120.694519], [27.943053, 120.610785], [27.99657, 120.610017], [27.98672, 120.545478], [27.871603, 120.667413], [27.992783, 120.546954], [28.000953, 120.53417], [28.009275, 120.531093], [27.998878, 120.60029], [27.978971, 120.546166], [27.962821, 120.618384], [27.87641, 120.677003], [27.997771, 120.578949], [27.955669, 120.662628], [27.974798, 120.688223], [27.888214, 120.647477], [27.997118, 120.596437], [27.96124, 120.619228], [27.990442, 120.546822], [27.961455, 120.675541], [27.861744, 120.680238], [27.926749, 120.71624], [27.86616, 120.662947], [27.942572, 120.609487], [27.95073, 120.651676], [27.966776, 120.584387], [27.984371, 120.573672], [27.948434, 120.663494], [27.988114, 120.621194], [27.976714, 120.659314], [27.963069, 120.604562], [27.966707, 120.602783], [27.964179, 120.672824], [27.988813, 120.553147], [28.042184, 120.503964], [27.998443, 120.613821], [27.950072, 120.679907], [28.010324, 120.537399], [27.984328, 120.574881], [28.008013, 120.582828], [27.950288, 120.57547], [27.990615, 120.638198], [27.879114, 120.696427], [27.97403, 120.583323], [27.960483, 120.676644], [27.999227, 120.579287], [27.8613, 120.665593], [27.960678, 120.662134], [27.97757, 120.638841], [27.983102, 120.720821], [27.967406, 120.664276], [27.993716, 120.62295], [27.864201, 120.686064], [27.986762, 120.547231], [27.9668, 120.6809], [27.989214, 120.549305], [27.984478, 120.687544], [27.979284, 120.602583], [27.941991, 120.681183], [27.980012, 120.562038], [27.985602, 120.576135], [28.001841, 120.585246], [27.980665, 120.561763], [27.956241, 120.662391], [27.998267, 120.64636], [27.959641, 120.686197], [27.983444, 120.572345], [27.950734, 120.573708], [27.943124, 120.659177], [27.988977, 120.552317], [27.993808, 120.581965], [27.984011, 120.687161], [27.976777, 120.617259], [27.983336, 120.551956], [27.860913, 120.676994], [27.928005, 120.685925], [27.953026, 120.665412], [27.942233, 120.609182], [27.863677, 120.668855], [27.943657, 120.659229], [28.002275, 120.535348], [27.978076, 120.617311], [28.043111, 120.502893], [27.978904, 120.603947], [27.976047, 120.680496], [27.946503, 120.696468], [27.986906, 120.682202], [27.987525, 120.545464], [27.989353, 120.550789], [27.960925, 120.608545], [27.974535, 120.662945], [27.961483, 120.661577], [27.920081, 120.710059], [27.974665, 120.585744], [27.975929, 120.609577], [28.002006, 120.598961], [27.954698, 120.578119], [27.95407, 120.590743], [27.988398, 120.628088], [27.866276, 120.685786], [27.961296, 120.673014], [27.97369, 120.628791], [27.957851, 120.580007], [27.977434, 120.684908], [27.97316, 120.68464], [27.966899, 120.680806], [27.960785, 120.620573], [27.962433, 120.667839], [27.951776, 120.629316], [27.871125, 120.660008], [27.962935, 120.673731], [27.967345, 120.682232], [27.961416, 120.674702], [27.960402, 120.581885], [27.952274, 120.654475], [27.944199, 120.589356], [27.96355, 120.621912], [27.977255, 120.689049], [27.99713, 120.576812], [27.995612, 120.635782], [27.99599, 120.616226], [27.879242, 120.655451], [27.96153, 120.6061], [27.987619, 120.686919], [28.011573, 120.645266], [27.977526, 120.639872], [27.988462, 120.554295], [27.949261, 120.575596], [27.866636, 120.663348], [27.999449, 120.646219], [27.988064, 120.544862], [27.9666, 120.680972], [27.96296, 120.68064], [27.984428, 120.687786], [28.007983, 120.582515], [27.95996, 120.676879], [27.980303, 120.728218], [27.942174, 120.657555], [27.973049, 120.6752], [27.988071, 120.624872], [27.864618, 120.679347], [27.941525, 120.599138], [27.990397, 120.534126], [27.983297, 120.572395], [27.980191, 120.723967], [27.989665, 120.685454], [27.94033, 120.573623], [27.971397, 120.688192], [27.902813, 120.640999], [27.965327, 120.605555], [27.941216, 120.682346], [27.96884, 120.582845], [27.961164, 120.672546], [27.996162, 120.614833], [27.978198, 120.641663], [27.944953, 120.686362], [27.980968, 120.726952], [27.951493, 120.575412], [27.973276, 120.686006], [27.977683, 120.668453], [27.9843, 120.606409], [27.964558, 120.627151], [27.862321, 120.674491], [27.987692, 120.685971], [27.975657, 120.615993], [27.990478, 120.553942], [27.97663, 120.612247], [27.861981, 120.666718], [27.981942, 120.585432], [27.963571, 120.621318], [27.861443, 120.678963], [27.984883, 120.54762], [27.865775, 120.683698], [27.963661, 120.621461], [27.876709, 120.662902], [27.947458, 120.669627], [27.96522, 120.603512], [27.966754, 120.594226], [27.990704, 120.548462], [27.994547, 120.57724], [28.012808, 120.646014], [27.964789, 120.6044], [28.013548, 120.643081], [27.987793, 120.685982], [27.964674, 120.6792], [27.957241, 120.579272], [27.968883, 120.691286], [27.981815, 120.690232], [27.974622, 120.607124], [27.948879, 120.575395], [27.97151, 120.681605], [27.968594, 120.689642], [27.876682, 120.678811], [27.951812, 120.625148], [27.959661, 120.676258], [27.95765, 120.660912], [27.953723, 120.61241], [27.926595, 120.684034], [27.965723, 120.674404], [27.995933, 120.555454], [27.979946, 120.723279], [27.984302, 120.586875], [27.934039, 120.602259], [27.989727, 120.59117], [27.880419, 120.677565], [27.951165, 120.622941], [27.935393, 120.688753], [27.958342, 120.683745], [27.876017, 120.657033], [27.996501, 120.592769], [27.996961, 120.552898], [28.003395, 120.549145], [27.963985, 120.663349], [27.97844, 120.640247], [27.974381, 120.674365], [27.980975, 120.561281], [27.961866, 120.673318], [27.94743, 120.605113], [27.908488, 120.644371], [27.975803, 120.614669], [27.986942, 120.624185], [27.999728, 120.535869], [27.973456, 120.606505], [27.990498, 120.534125], [27.984887, 120.679753], [27.962607, 120.694372], [27.977801, 120.690532], [27.977317, 120.680213], [27.982812, 120.686795], [27.973239, 120.688233], [27.986754, 120.684677], [27.999424, 120.595422], [27.96234, 120.673325], [27.958863, 120.666873], [27.955165, 120.662141], [27.991107, 120.591358], [27.977587, 120.606794], [27.990049, 120.593707], [27.951447, 120.62521], [27.96215, 120.606612], [27.926815, 120.720104], [27.941772, 120.678589], [27.946742, 120.68699], [27.948023, 120.680954], [27.881101, 120.676462], [27.87662, 120.678533], [27.876475, 120.677828], [27.866054, 120.66437], [27.997321, 120.537826], [27.95629, 120.578783], [27.982108, 120.573833], [27.959283, 120.581003], [27.976714, 120.659314]]
		var supermarket3 = [[27.990186, 120.719959], [27.812874, 120.801143], [27.971426, 120.745312], [27.935002, 120.80527], [27.852597, 120.81575], [27.887492, 120.820678], [27.981213, 120.753857], [27.974788, 120.740586], [27.807446, 120.786731], [27.907085, 120.829874], [27.828514, 120.790996], [27.93008, 120.856867], [27.971942, 120.751953], [27.969196, 120.761954], [27.97967, 120.736649], [27.83315, 120.770976], [27.901387, 120.829911], [27.87018, 120.823567], [27.891747, 120.820974], [27.917886, 120.849604], [27.978007, 120.758666], [27.879993, 120.809956], [27.882245, 120.814279], [27.872609, 120.821745], [27.979373, 120.765421], [27.926448, 120.832997], [27.899002, 120.827053], [27.836854, 120.776825], [27.860163, 120.797086], [27.861741, 120.821164], [27.933673, 120.803204], [27.88967, 120.820937], [27.840707, 120.783085], [27.862695, 120.800443], [27.887808, 120.819383], [27.843174, 120.79966], [27.91433, 120.847429], [27.974301, 120.743616], [27.847578, 120.789305], [27.971826, 120.792832], [27.912118, 120.817266], [27.930378, 120.846807], [27.984135, 120.740264], [27.831512, 120.771226], [27.879936, 120.810246], [27.924886, 120.834153], [27.9862, 120.744702], [27.922152, 120.839069], [27.850518, 120.813697], [27.876834, 120.795052], [27.905888, 120.81935], [27.883282, 120.81532], [27.914484, 120.848181], [27.976659, 120.758268], [27.877625, 120.808541], [27.93124, 120.828352], [27.924975, 120.833875], [27.845272, 120.802965], [27.842852, 120.798233], [27.915466, 120.808276], [27.847417, 120.807504], [27.968875, 120.753234], [27.99297, 120.732669], [27.967641, 120.751044], [27.975761, 120.744098], [27.969507, 120.772977], [27.968442, 120.752204], [27.90171, 120.829035], [27.902274, 120.829132], [27.927402, 120.831312], [27.842937, 120.799522], [27.880352, 120.812239], [27.930162, 120.858398], [27.935547, 120.794996], [27.976088, 120.744199], [27.963422, 120.759561], [27.953704, 120.736904], [27.870999, 120.800716], [27.936035, 120.825621], [27.89198, 120.820566], [27.983181, 120.743492], [27.931177, 120.836477], [27.850126, 120.818035], [27.90326, 120.828235], [27.83945, 120.757053], [27.835308, 120.774706], [27.98161, 120.765866], [27.897863, 120.825307], [27.934575, 120.804774], [27.847881, 120.788805], [27.875984, 120.801009], [27.869805, 120.824106], [27.968862, 120.763553], [27.911866, 120.830373], [27.990935, 120.734182], [27.831781, 120.771253], [27.932425, 120.823969], [27.896227, 120.826099], [27.955764, 120.842987], [27.841283, 120.785738], [27.865813, 120.794917], [27.832844, 120.775572], [27.989922, 120.743486], [27.876161, 120.800313], [27.868077, 120.792098], [27.985843, 120.741147], [27.924849, 120.833816], [27.837258, 120.779768], [27.941249, 120.808657], [27.890931, 120.820474], [27.973807, 120.7441], [27.904846, 120.815779], [27.844065, 120.76158], [27.901576, 120.831366], [27.930372, 120.853676], [27.990599, 120.733911], [27.93726, 120.861272], [27.981353, 120.75877], [27.952359, 120.846833], [27.872753, 120.805421], [27.871629, 120.796974], [27.941921, 120.859035], [27.980181, 120.756525], [27.94078, 120.859917], [27.875129, 120.806477], [27.97478, 120.744041], [27.923678, 120.844113], [27.918638, 120.827256], [27.853498, 120.814755], [27.96737, 120.81856], [27.928946, 120.850352], [27.92968, 120.800936], [27.894236, 120.82143], [27.839442, 120.781986], [27.930103, 120.83592], [27.900705, 120.828507], [27.867386, 120.794836], [27.976445, 120.754558], [27.850003, 120.805097], [27.952532, 120.73392], [27.996695, 120.736571], [27.974802, 120.754224], [27.848212, 120.789365], [27.838755, 120.756749], [27.835347, 120.775209], [27.922543, 120.846489], [27.927116, 120.822855], [27.836296, 120.769131], [27.925779, 120.818042], [27.985861, 120.746929], [27.981374, 120.741691], [27.977368, 120.748507], [27.976234, 120.767293], [27.976133, 120.747322], [27.991162, 120.721728], [27.915107, 120.825872], [27.877617, 120.827145], [27.993992, 120.730929], [27.876395, 120.801277], [27.977201, 120.747452], [27.876135, 120.805426], [27.868803, 120.796876], [27.872298, 120.804826], [27.842048, 120.78533], [27.934435, 120.848687], [27.981467, 120.740408], [27.87238, 120.806213], [27.865707, 120.794711], [27.869516, 120.794317], [27.919229, 120.847804], [27.915589, 120.846978], [27.867672, 120.796387], [27.972343, 120.776309], [27.846131, 120.801342], [27.839844, 120.756735], [27.932078, 120.827665], [27.939743, 120.785717], [27.990877, 120.737296], [27.93537, 120.813613], [27.915081, 120.846645], [27.89974, 120.81266], [27.914401, 120.808157], [27.982737, 120.74303], [27.936911, 120.82612], [27.991039, 120.719739], [27.856527, 120.791214], [27.996699, 120.736352], [27.990536, 120.719799], [27.84315, 120.796823], [27.926763, 120.818254], [27.986324, 120.726157], [27.929318, 120.854437], [27.885823, 120.813602], [27.996702, 120.722648], [27.864312, 120.792321], [27.926468, 120.832511], [27.861163, 120.809834], [27.980538, 120.741477], [27.975664, 120.769178], [27.929334, 120.861378], [27.91555, 120.846788], [27.915556, 120.829349], [27.994845, 120.730712], [27.930107, 120.826356], [27.930798, 120.836179], [27.843016, 120.797577], [27.967969, 120.819068], [27.969807, 120.764641], [27.905123, 120.827354], [27.969221, 120.765694], [27.880285, 120.809743], [27.867852, 120.825745], [27.991391, 120.735553], [27.964757, 120.80897], [27.932285, 120.827063], [27.968838, 120.820336], [27.839603, 120.769402], [27.970704, 120.793121], [27.968725, 120.764246], [27.985614, 120.744446], [27.932652, 120.828626], [27.927785, 120.831559], [27.912605, 120.840734], [27.898152, 120.827409], [27.97533, 120.7447], [27.991876, 120.717717], [27.967518, 120.772213], [27.830582, 120.775905], [27.983625, 120.734252], [27.976972, 120.771836], [27.898923, 120.809676], [27.968828, 120.81481], [27.928508, 120.858707], [27.974521, 120.744511], [27.974521, 120.744511], [27.976486, 120.747083], [27.933652, 120.803372], [27.845115, 120.76386], [27.946173, 120.800657], [27.829938, 120.792046], [27.939478, 120.86091], [27.985627, 120.745824], [27.896823, 120.811937], [27.98663, 120.72665], [27.897584, 120.810822], [27.890878, 120.813782], [27.871869, 120.800839], [27.877189, 120.809019], [27.971418, 120.750995], [27.968874, 120.816737], [27.968276, 120.820465], [27.968126, 120.81935], [27.968165, 120.767277], [27.991312, 120.7334], [27.986013, 120.7547], [27.959326, 120.738061], [27.977198, 120.75571], [27.929333, 120.832466], [27.925633, 120.832357], [27.948228, 120.840058], [27.925332, 120.819321], [27.925561, 120.842186], [27.906066, 120.827688], [27.915542, 120.827786], [27.887087, 120.81562], [27.904551, 120.816587], [27.890475, 120.819439], [27.84008, 120.769092], [27.847167, 120.764903], [27.970984, 120.814534], [27.971956, 120.766521], [27.997031, 120.734843], [27.996461, 120.736002], [27.990503, 120.719559], [27.975682, 120.745403], [27.979274, 120.734551], [27.985561, 120.730268], [27.979806, 120.761243], [27.981359, 120.758737], [27.933594, 120.853292], [27.935883, 120.82537], [27.911158, 120.831842], [27.908442, 120.83431], [27.933103, 120.83416], [27.933486, 120.802364], [27.935801, 120.778998], [27.932766, 120.803924], [27.871023, 120.821687], [27.88749, 120.814976], [27.880133, 120.810057], [27.875977, 120.831501], [27.881472, 120.808353], [27.868691, 120.79463], [27.870714, 120.795481], [27.835428, 120.770825], [27.833383, 120.76756], [27.834827, 120.762945], [27.837035, 120.761268], [27.962863, 120.828837], [27.963237, 120.829457], [27.975937, 120.768036], [27.985697, 120.735653], [27.975952, 120.752394], [27.985557, 120.7458], [27.951357, 120.734552], [27.983267, 120.743397], [27.992536, 120.723466], [27.980789, 120.742443], [27.991196, 120.736694], [27.98242, 120.761361], [27.93451, 120.851895], [27.923009, 120.831824], [27.907722, 120.829576], [27.928529, 120.834475], [27.947603, 120.845564], [27.939493, 120.849448], [27.93498, 120.813533], [27.933031, 120.836732], [27.934092, 120.819453], [27.932609, 120.804615], [27.881183, 120.811146], [27.886302, 120.809487], [27.862482, 120.79588], [27.857534, 120.828864], [27.836491, 120.773457], [27.836573, 120.773184], [27.830644, 120.774501], [27.968874, 120.816737], [27.932896, 120.80247], [27.833918, 120.769332], [27.966413, 120.806211], [27.914349, 120.828197], [27.88664, 120.799199], [27.981012, 120.766643], [27.914041, 120.843331], [27.896181, 120.823235], [27.943157, 120.791913], [27.905088, 120.825025], [27.967349, 120.818471], [27.898738, 120.80983], [27.836608, 120.766241], [27.83824, 120.759803], [27.929958, 120.846638], [27.868035, 120.792484], [27.842496, 120.784973], [27.904278, 120.826753], [27.965982, 120.761511], [27.88856, 120.812622], [27.991267, 120.720041], [27.979089, 120.757256], [27.988815, 120.745547], [27.9796, 120.757265], [27.883073, 120.80702], [27.928631, 120.833859], [27.919062, 120.850576], [27.976804, 120.770246], [27.885409, 120.816827], [27.996533, 120.736021], [27.997147, 120.72006], [27.926623, 120.816638], [27.89172, 120.820911], [27.882925, 120.812986], [27.929303, 120.800446], [27.922868, 120.831838], [27.864399, 120.795987], [27.918359, 120.830523], [27.936805, 120.810115], [27.867369, 120.82547], [27.93211, 120.836119], [27.974955, 120.745043], [27.92742, 120.832943], [27.909033, 120.830501]]
		var bank = [[27.974776, 120.680013], [27.991119, 120.633784], [28.009913, 120.645044], [27.990134, 120.649115], [27.903204, 120.644986], [27.878309, 120.682816], [27.97763, 120.721129], [27.987847, 120.688612], [27.959997, 120.662973], [27.963531, 120.607083], [27.918891, 120.707233], [27.998547, 120.580901], [27.987289, 120.545233], [27.977045, 120.601325], [27.991017, 120.633697], [27.960311, 120.58354], [27.974772, 120.680105], [27.860115, 120.677294], [27.975442, 120.690911], [27.977476, 120.721063], [27.988768, 120.693014], [27.9957, 120.614733], [27.998084, 120.535389], [27.950128, 120.575993], [27.903236, 120.644947], [28.012916, 120.645355], [27.990371, 120.648871], [27.996416, 120.637701], [28.009974, 120.644951], [27.987847, 120.688627], [28.009202, 120.674257], [28.016473, 120.671488], [27.993451, 120.671442], [28.075866, 120.595818], [28.006105, 120.664791], [27.99719, 120.689459], [28.017173, 120.608016], [28.000198, 120.689278], [28.024622, 120.615397], [28.012153, 120.679781], [28.027096, 120.679265], [28.006191, 120.708801], [28.010694, 120.700924], [27.993554, 120.685702], [27.990963, 120.692179], [27.997864, 120.682464], [28.009329, 120.655425], [28.012706, 120.672553], [28.026387, 120.659821], [28.028144, 120.653156], [28.023738, 120.682885], [28.018128, 120.663421], [28.005412, 120.712275], [28.005318, 120.693116], [28.023062, 120.671888], [28.019021, 120.642609], [28.019368, 120.633499], [28.005907, 120.654593], [28.018576, 120.693921], [27.998131, 120.686824], [28.010768, 120.727014], [28.014456, 120.683509], [28.01751, 120.671404], [28.01389, 120.632453], [28.013658, 120.662047], [28.005823, 120.722615], [28.029357, 120.668183], [28.025735, 120.641799], [28.008211, 120.718678], [28.019702, 120.658403], [28.038639, 120.599829], [28.048971, 120.598513], [28.075858, 120.595928], [27.987744, 120.671891], [27.988768, 120.693014], [28.017535, 120.671354], [28.012548, 120.651512], [28.012261, 120.67971], [27.997918, 120.682396], [28.003608, 120.659572], [28.024033, 120.683019], [27.993394, 120.671658], [28.007197, 120.659949], [28.01379, 120.662085], [28.012829, 120.67233], [28.024577, 120.615391], [28.018128, 120.663539], [28.006219, 120.664834], [27.995682, 120.735956], [27.836415, 120.767287], [27.925636, 120.820367], [27.992543, 120.717139], [27.914651, 120.835697], [27.995914, 120.718282], [27.866708, 120.825249], [27.849593, 120.813527], [27.860656, 120.810271], [27.992673, 120.716974], [27.993235, 120.723385], [27.971277, 120.893662], [27.979403, 120.736302], [27.926366, 120.820541], [27.889162, 120.812781], [27.930115, 120.846773], [27.836395, 120.767329], [27.975269, 120.774166], [27.980679, 120.75354], [27.973287, 120.750019], [27.975732, 120.736737], [27.979714, 120.757765], [27.925666, 120.835872], [27.995567, 120.735789], [27.975105, 120.769414], [27.995965, 120.718313]]
		var hhhhhh = [198, 197, 111, 186, 187, 188, 183, 181, 182, 185, 49, 48, 47, 184, 19, 18, 21, 110, 141, 194, 70, 72, 71, 73, 23, 228, 155, 130, 131, 249, 247, 248, 246, 245, 4, 119, 121, 120, 136, 22, 134, 199, 204, 164, 165]
		var hhhhhh1 = [218, 245, 90, 244, 298, 259, 102, 297, 284, 223, 307, 194, 335, 357, 313, 113, 217, 283, 20, 88, 59, 219, 138, 7, 229, 355, 127, 115, 285, 45, 369, 327, 140, 200]
		var hhhhhh2 = [50, 233, 344, 299, 13, 314, 223, 42, 163, 329, 245, 298, 235, 164, 336, 214, 167, 124, 161, 176, 293, 22, 232, 354]
		var hhhhhh3 = [358, 225, 306, 0, 276, 243, 202, 42, 102, 151, 302, 137, 351, 198, 217, 330, 336, 285, 359, 146, 96, 317, 47, 345]
		var supermarketdata = [[27.998902, 120.712373], [28.006387, 120.712702], [28.007824, 120.7131], [28.005506, 120.718915], [28.015292, 120.704099], [28.022671, 120.696766], [28.016306, 120.693774], [28.015126, 120.698187], [28.008296, 120.68209], [28.011717, 120.680079], [28.023139, 120.673808], [28.024224, 120.671416], [28.012964, 120.674913], [28.01141, 120.672191], [28.015232, 120.668127], [28.016969, 120.663709], [28.024878, 120.662106], [28.029509, 120.669774], [28.011956, 120.653996], [27.995582, 120.660864], [27.995431, 120.670741], [27.994003, 120.675814], [27.992943, 120.655458], [27.989866, 120.648367], [28.003582, 120.650296], [28.01193, 120.649857], [28.013358, 120.654488], [28.014595, 120.627418], [28.018045, 120.617784], [28.01708, 120.613422], [28.025865, 120.615147], [28.023572, 120.61073], [28.024652, 120.606358], [28.012509, 120.610717], [27.983071, 120.724905], [27.977255, 120.689049], [27.982812, 120.686795], [27.987793, 120.685982], [27.969221, 120.681809], [27.965723, 120.674404], [27.962433, 120.667839], [27.976623, 120.667028], [27.960678, 120.662134], [27.97844, 120.640247], [27.999449, 120.646219], [28.013548, 120.643081], [27.995612, 120.635782], [27.97757, 120.638841], [27.986942, 120.624185], [27.988398, 120.628088], [27.993716, 120.62295], [27.998878, 120.60029], [27.999227, 120.579287], [27.985602, 120.576135], [27.966754, 120.594226], [27.962767, 120.620404], [27.96355, 120.621912], [27.951447, 120.62521], 		[27.997147, 120.72006], [27.991876, 120.717717], [27.992536, 120.723466], [27.990186, 120.719959], [27.985561, 120.730268], [27.98663, 120.72665], [27.994845, 120.730712], [27.984135, 120.740264], [27.989922, 120.743486], [27.977368, 120.748507], [27.975952, 120.752394], [27.976445, 120.754558], [27.9796, 120.757265], [27.975664, 120.769178], [27.970704, 120.793121], [27.966413, 120.806211], [27.943157, 120.791913], [27.935801, 120.778998], [27.926623, 120.816638], [27.927116, 120.822855], [27.932425, 120.823969], [27.933031, 120.836732], [27.922152, 120.839069], [27.904278, 120.826753]]
		var newbank = [[27.974776, 120.680013], [27.991119, 120.633784], [27.990134, 120.649115], [27.97763, 120.721129], [27.987847, 120.688612], [27.959997, 120.662973], [27.998547, 120.580901], [27.987289, 120.545233], [27.974772, 120.680105], [27.975442, 120.690911], [27.9957, 120.614733], [28.012916, 120.645355], [27.996416, 120.637701], [28.009974, 120.644951], [28.009202, 120.674257], [28.016473, 120.671488], [27.993451, 120.671442], [27.99719, 120.689459], [28.017173, 120.608016], [28.000198, 120.689278], [28.024622, 120.615397], [28.027096, 120.679265], [28.006191, 120.708801], [28.010694, 120.700924], [27.993554, 120.685702], [27.990963, 120.692179], [28.009329, 120.655425], [28.028144, 120.653156], [28.023738, 120.682885], [28.005412, 120.712275], [28.005318, 120.693116], [28.023062, 120.671888], [28.019021, 120.642609], [28.019368, 120.633499], [28.005907, 120.654593], [28.018576, 120.693921], [27.998131, 120.686824], [28.010768, 120.727014], [28.014456, 120.683509], [28.01389, 120.632453], [28.005823, 120.722615], [28.029357, 120.668183], [28.025735, 120.641799], [28.008211, 120.718678], [28.019702, 120.658403], [27.987744, 120.671891], [27.988768, 120.693014], [28.012548, 120.651512], [28.012261, 120.67971], [27.997918, 120.682396], [28.003608, 120.659572], [27.993394, 120.671658], [28.007197, 120.659949], [28.01379, 120.662085], [28.012829, 120.67233], [28.024577, 120.615391], [28.018128, 120.663539], [28.006219, 120.664834], [27.992673, 120.716974], [27.993235, 120.723385], [27.926366, 120.820541], [27.973287, 120.750019], [27.975732, 120.736737], [27.979714, 120.757765], [27.925666, 120.835872], [27.995567, 120.735789], [27.975105, 120.769414], [27.995965, 120.718313]]
		var primaryschool = [[27.930906, 120.833949], [27.942772, 120.786075], [27.945486, 120.823379], [27.891689, 120.806049], [27.926905, 120.830657], [27.932219, 120.856011], [27.919777, 120.830875], [27.912677, 120.825686], [27.992036, 120.737944], [27.845235, 120.788451], [27.839226, 120.76034], [27.916466, 120.811168], [27.945001, 120.804144], [27.943753, 120.777706], [27.91175, 120.841708], [27.9599, 120.737401], [27.967811, 120.883221], [27.970059, 120.898811], [27.839487, 120.760829], [27.831712, 120.774883], [27.968317, 120.813986], [27.894301, 120.823991], [27.909416, 120.815973], [27.972009, 120.766258], [27.927277, 120.848804], [27.906115, 120.827646], [27.968482, 120.789304], [27.899551, 120.825117], [27.89922, 120.832682], [27.888402, 120.815482], [27.95261, 120.838457], [27.960628, 120.737554], [27.86178, 120.796947], [27.918507, 120.809296], [27.933861, 120.833369], [27.952484, 120.835173], [27.938637, 120.847599], [27.968307, 120.788432], [27.949038, 120.838623], [27.930464, 120.802065], [27.955313, 120.68277], [27.943814, 120.659669], [27.942295, 120.589599], [27.96357, 120.578831], [27.953596, 120.623951], [27.863284, 120.66784], [27.977061, 120.719737], [27.929044, 120.589546], [27.869949, 120.681443], [27.991373, 120.61969], [27.878875, 120.656695], [27.988664, 120.625999], [27.994638, 120.578661], [27.917661, 120.699098], [28.00693, 120.542812], [27.991979, 120.541714], [27.900407, 120.677687], [27.965152, 120.634787], [27.869311, 120.661957], [27.952043, 120.661842], [27.947608, 120.604868], [27.991391, 120.53568], [27.893913, 120.64285], [27.982031, 120.724968], [28.003133, 120.609387], [28.006766, 120.558962], [27.949817, 120.625723], [27.917803, 120.582243], [27.983066, 120.679062], [27.942791, 120.548647], [27.976388, 120.659198], [27.925988, 120.566728], [27.936216, 120.691986], [27.881645, 120.697937], [27.878638, 120.677157], [28.024521, 120.485098], [27.881528, 120.683108], [27.970786, 120.714117], [27.98213, 120.724822], [27.971245, 120.546903], [27.978182, 120.569693], [27.917645, 120.582224], [27.956451, 120.65957], [27.935594, 120.72357], [27.918263, 120.652451], [27.994608, 120.578664], [27.99138, 120.534993], [27.950645, 120.709813], [28.014647, 120.531507], [27.919574, 120.714333], [27.997839, 120.536923], [27.968746, 120.726987], [27.905381, 120.644915], [28.005575, 120.426738], [27.887621, 120.637877], [28.053149, 120.415932], [27.980871, 120.688624], [27.947442, 120.605], [28.003098, 120.610069], [27.916977, 120.670164], [28.015865, 120.663472], [28.02393, 120.694253], [28.008072, 120.671476], [28.007381, 120.73432], [28.003195, 120.736508], [28.020713, 120.621362], [28.004791, 120.648887], [27.996591, 120.679717], [28.015413, 120.672664], [28.049133, 120.5891], [28.086854, 120.545966], [28.002473, 120.678106], [28.067637, 120.587912], [28.009195, 120.726043], [27.994154, 120.681504], [28.014618, 120.612749], [28.004161, 120.657638], [28.004152, 120.654784], [28.019004, 120.666229], [28.016559, 120.644326], [28.013776, 120.625117], [28.024076, 120.665658], [28.084441, 120.596864], [28.048389, 120.599802], [28.019005, 120.702008], [28.140505, 120.447824], [28.010867, 120.602755], [28.018247, 120.609358], [28.003636, 120.70289], [28.023002, 120.65765], [28.018656, 120.707777], [28.076475, 120.511232], [28.014013, 120.701421], [28.011254, 120.683344], [28.020354, 120.691076], [28.025329, 120.631929], [28.014483, 120.707781], [27.98946, 120.672748], [28.024199, 120.613874], [28.101306, 120.507638], [28.019676, 120.608236], [28.086982, 120.546941], [28.035242, 120.495477], [28.025872, 120.586824], [28.029346, 120.67034], [28.010867, 120.631976], [28.139089, 120.492415], [28.012032, 120.656528], [28.140312, 120.447873], [28.008694, 120.773306], [27.991599, 120.714178], [28.069217, 120.515398], [28.000773, 120.788202], [28.024356, 120.661344], [28.13997, 120.54605], [28.094306, 120.515329], [28.10312, 120.556597], [28.097377, 120.499464], [28.009014, 120.726784], [28.084897, 120.597012], [27.997354, 120.668917], [28.017166, 120.593277], [28.158725, 120.412119], [28.098716, 120.52703], [28.133574, 120.559428], [28.019004, 120.666229], [28.003949, 120.702868], [28.058838, 120.512264], [28.06922, 120.515391], [28.019865, 120.608153], [28.008871, 120.77349], [27.99738, 120.668789], [28.008332, 120.678672], [28.008481, 120.708623], [28.017778, 120.72094], [28.018062, 120.654001], [28.015028, 120.670984], [28.079836, 120.599375], [28.003635, 120.679413], [28.097696, 120.468428]]
		var piupiu = []
		userfullist = []
		function append1(e){
    		this.remove();
    		for(i = 0; i<bank.length; i++){
					if(latlngtran.bd09togcj02(bank[i])[0] == parseFloat(e.latlng.lat)&&latlngtran.bd09togcj02(bank[i])[1] == parseFloat(e.latlng.lng)){
//						userfullist.push(i);
						bank.splice(i,1);
						console.log(i)
						break;
					}
				}

    		console.log(userfullist)
		}

		var school = [[27.998171794951713, 120.6515657901764], [28.00205572083928, 120.66010594367982]], info = ["温州市第十七中学", "温州市第三中学"]

		$("#se_title").on("click", function(){
			var cccolor1 = [28, 30, 21, 15, 9, 7, 8, 10, 18, 17, 20], cccolor2 = [36, 35, 35, 28, 35, 32, 34, 32, 32, 25, 25, 25]
			var max_realspeed = d3.max([d3.max(cccolor1), d3.max(cccolor2)]), min_realspeed = d3.min([d3.min(cccolor1), d3.min(cccolor2)]);
			var compute1 = d3.interpolate('#60CDBE', '#FDFFBF');
			var compute2 = d3.interpolate('#AA1B27', '#FDFFBF');
			let colordata = [17, 28, 36, 19, 26, 17, 26, 15, 9, 7, 17, 26, 25, 22, 38, 18, 43, 50, 13, 0, 14, 17, 34, 0, 0, 60, 0, 0, 37, 21, 0, 0, 21, 18, 29, 0, 11, 0, 26, 16, 10, 39, 45, 53, 53, 11, 44, 24, 0, 0, 11, 0, 9, 28, 24, 27, 22, 17, 10, 26, 23, 15, 17, 21, 21, 26, 8, 6, 2, 13, 14, 5, 22, 15, 0, 3, 0, 0, 5, 17, 15, 0, 0, 0, 1, 0, 6, 0, 25, 2, 0, 4, 2, 0, 4, 10, 0, 7, 2, 16, 3, 0, 0, 10, 22, 16, 0, 9, 38, 25, 13, 0, 26, 0, 20, 20, 0, 0, 0, 0, 0, 0, 22, 0, 17, 9, 0, 17, 7, 16, 17, 0, 0, 0, 16, 1, 0, 1, 12, 5, 12, 0, 2, 2, 10, 4, 28, 27, 60, 6, 67, 58, 0, 9, 21, 27, 15, 26, 24, 17, 19, 31, 14, 0, 0, 10, 9, 16, 23, 27, 32, 0, 38, 28, 17, 22, 0, 27, 22, 0, 22, 19, 51, 35, 9, 18, 0, 18, 14, 27, 9, 0, 11, 0, 8, 32, 6, 30, 22, 0, 13, 0, 5, 22, 9, 14, 4, 5, 0, 34, 0, 6, 33, 22, 16, 11, 5, 0, 0, 14, 0, 17, 11, 14, 12, 10, 17, 9, 7, 9, 1, 16, 0, 29, 8, 19, 24, 18, 16, 0, 26, 21, 13, 0, 0, 0, 40, 27, 0, 20, 1, 24, 13, 23, 0, 10, 0, 0, 0, 0, 6, 50, 24, 37, 47, 24, 21, 18, 25, 17, 0, 24, 13, 0, 0, 0, 12, 0, 3, 22, 19, 0, 17, 45, 23, 48, 37, 20, 0, 35, 27, 21, 10, 7, 4, 25, 0, 0, 0, 12, 21, 4, 3, 0, 25, 34, 21, 14, 32, 32, 36, 34, 22, 19, 9, 0, 0, 0, 35, 13, 13, 31, 34, 34, 24, 0, 0, 14, 0, 6, 0, 19, 2, 16, 14, 11, 11, 17, 7, 27, 28, 14, 27, 5, 6, 7, 15, 15, 35, 18, 58, 39, 12, 33, 58, 63, 4, 57, 0, 0, 34, 0, 8, 13, 21, 0, 0, 9, 16, 22, 23, 17, 10, 0, 19, 12, 24, 15, 24, 27, 15, 27, 19, 31, 16, 33, 42, 32, 40, 27, 35, 21, 27, 20, 20, 11, 16, 25, 0, 13, 32, 39, 0, 24, 0, 21, 23, 7, 17, 0, 0, 0, 34, 22, 22, 0, 19, 41, 24, 25, 44, 53, 14, 13, 22, 21, 4, 0, 0, 15, 11, 0, 5, 0, 47, 64, 42, 14, 15, 23, 24, 19, 17, 19, 19, 28, 20, 21, 27, 37, 0, 0, 7, 2, 9, 0, 2, 23, 16, 20, 2, 26, 10, 9, 0, 0, 45, 0, 0, 22, 35, 0, 37, 30, 0, 45, 25, 72, 46, 57, 42, 39, 34, 36, 2, 51, 23, 15, 27, 38, 23, 22, 20, 39, 51, 62, 30, 14, 56, 21, 58, 79, 0, 72, 89, 71, 71, 0, 74, 0, 0, 0, 33, 0, 24, 0, 0, 0, 0, 14, 13, 8, 33, 0, 29, 26, 0, 20, 21, 30, 0, 39, 0, 67, 34, 31, 15, 40, 41, 21, 60, 0, 0, 0, 4, 0, 18, 0, 0, 0, 41, 0, 10, 0, 9, 0, 0, 0, 0, 0, 0, 55, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 73, 0, 16, 0, 0, 0, 12, 25, 44, 48, 46, 33, 12, 31, 0, 8, 0, 14, 21, 37, 26, 16, 15, 15, 30, 26, 35, 29, 26, 27, 29, 22, 46, 0, 0, 0, 69, 24, 66, 76, 79, 78, 1, 34, 0, 0, 46, 0, 28, 5, 0, 0, 0, 0, 0, 16, 0, 7, 0, 0, 0, 0, 46, 0, 0, 0, 0, 36, 14, 0, 4, 0, 31, 0, 0, 0, 0, 0, 13, 41, 13, 59, 28, 0, 36, 19, 20, 0, 48, 1, 26, 25, 5, 15, 0, 4, 2, 20, 2]
			var linear1 = d3.scaleLinear()
				           .domain([30, 0])  
				           .range([0, 1]);
			var linear2 = d3.scaleLinear()  
				           .domain([0, 10])  
				           .range([0, 1]);

			let jj = 4;
			let color = "#D6D3D3"
			for(let j = 0; j<RS_list.length; j++){
				if(j != 464){
					let newcccc;
					newcccc = compute1(linear1(colordata[j]))

			  		if(RS_list[j].length == 4){
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][3].lat),parseFloat(RS_list[j][3].lng)])], {color: newcccc, opacity: 1, weight: jj, className: 'road'+j})
			  					    .addTo(map);
			  		}else if(RS_list[j].length == 3){
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][2].lat),parseFloat(RS_list[j][2].lng)])], {color: newcccc, opacity: 1, weight: jj, className: 'road'+j})
			  						.addTo(map);
			  		}else{
			  			polyline = L.polyline([latlngtran.wgs84togcj02([parseFloat(RS_list[j][0].lat),parseFloat(RS_list[j][0].lng)]), latlngtran.wgs84togcj02([parseFloat(RS_list[j][1].lat),parseFloat(RS_list[j][1].lng)])], {color: newcccc, opacity: 1, weight: jj, className: 'road'+j})
			  						.addTo(map);
			  				}
				}
			}
		})
		
		
});