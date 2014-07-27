function DM_redirect(MobileURL, Home){
	try {
		// avoid loops within mobile site
		if(document.getElementById("dmRoot") != null)
		{
			return;
		}
		var CurrentUrl = location.href;
		var noredirect = document.location.search;
		if (noredirect.indexOf("no_redirect=true") < 0){
			if ((navigator.userAgent.match(/^[^\[]*(iPhone|iPod|iPad|BlackBerry|Android.*Mobile|BB10.*Mobile|webOS|Windows CE|IEMobile|Opera Mini|Opera Mobi|HTC|LG-|LGE|SAMSUNG|Samsung|SEC-SGH|Symbian|Nokia|PlayStation|PLAYSTATION|Nintendo DSi).*$/im)) ) {
				
				if(Home){
					location.replace(MobileURL);
				}
				else
				{
					location.replace(MobileURL + "?url=" + encodeURIComponent(CurrentUrl));
				}
			}
		}	
	}
	catch(err){}
}
