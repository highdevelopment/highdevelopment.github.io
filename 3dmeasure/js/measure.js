
var EPS = 0.00000001;
var infinity = 100000000;

var PI = (4*Math.atan(1.0));

function Distance(u, v)
{
	return Math.sqrt((u.x-v.x)*(u.x-v.x)+(u.y-v.y)*(u.y-v.y)+(u.z-v.z)*(u.z-v.z));
}

function ScalarDot3(o, u, v)
{
	return (u.x-o.x)*(v.x-o.x)+(u.y-o.y)*(v.y-o.y)+(u.z-o.z)*(v.z-o.z);
}

function LineIntersect(u1, v1, u2, v2)
{
	var a, b, c, d, e, f;
	a = v1.y-u1.y; b=u1.x-v1.x; e=u1.x*v1.y-u1.y*v1.x;
	c = v2.y-u2.y; d=u2.x-v2.x; f=u2.x*v2.y-u2.y*v2.x;

	var inter = {};	
	inter.x = (e*d-f*b)/(a*d-b*c);
	inter.y = (a*f-e*c)/(a*d-b*c);
	inter.z = 0;

	return inter;
}


// function fabs()
function getMeasure(cali_width, cali_height, ref_pos1, ref_pos2, ref_pos3, ref_pos4, user_pos1, user_pos2)
{
	var ret = 0;
	var p = [], q = [];
	var crossCnt = 0;
	var zp1 = {}, zp2 = {}, inter = [{}, {}], xp1 = {}, xp2 = {};
	var i;
	var a, b, c, u1, u2;
	var pp = [{}, {}, {}, {}], qq = [{}, {}, {}, {}];
	var low, high, mid1, mid2, v1, v2;
	var lowy, highy, mid1y, mid2y;
	var dx, dy;

	ref_pos1.z = 0;
	ref_pos2.z = 0;
	ref_pos3.z = 0;
	ref_pos4.z = 0;
	user_pos1.z = 0;
	user_pos2.z = 0;

	p[0] = ref_pos1; p[1] = ref_pos2; p[2] = ref_pos3; p[3] = ref_pos4;
	q[0] = user_pos1; q[1] = user_pos2;

	if (Math.abs((p[0].x-p[1].x)*(p[3].y-p[2].y) - (p[0].y-p[1].y)*(p[3].x-p[2].x)) < EPS) {
		if (Math.abs((p[0].x-p[3].x)*(p[1].y-p[2].y) - (p[0].y-p[3].y)*(p[1].x-p[2].x)) < EPS) {
			return Distance(q[0], q[1])/Distance(p[0], p[1]) * cali_width;
		} else {
			crossCnt++;
			inter[0] = LineIntersect(p[0], p[3], p[1], p[2]);
			inter[1].x = p[0].x-p[1].x;
			inter[1].y = p[0].y-p[1].y;
			inter[1].z = 0;
		}
	} else {
		crossCnt++;
		inter[0] = LineIntersect(p[0], p[1], p[2], p[3]);
		if (Math.abs((p[0].x-p[3].x)*(p[1].y-p[2].y) - (p[0].y-p[3].y)*(p[1].x-p[2].x)) < EPS) {
			inter[1].x = p[0].x-p[3].x;
			inter[1].y = p[0].y-p[3].y;
			inter[1].z = 0;
		} else {
			crossCnt++;
			inter[1] = LineIntersect(p[0], p[3], p[2], p[1]);
		}
	}
	if (crossCnt == 1) {
		inter[0].x -= inter[1].x;
		inter[0].y -= inter[1].y;
		inter[0].z -= inter[1].z;
		inter[1].x = inter[0].x + 2 * inter[1].x;
		inter[1].y = inter[0].y + 2 * inter[1].y;
		inter[1].z = inter[0].z + 2 * inter[1].z;
	}
	dx = (inter[1].x-inter[0].x) / Distance(inter[0], inter[1]);
	dy = (inter[1].y-inter[0].y) / Distance(inter[0], inter[1]);

	low =0; high = Distance(inter[0], inter[1]);
	var al = 0;

	while(high-low>EPS) {
		mid1 = (low*2+high)/3;
		mid2 = (low+high*2)/3;

		xp2.x = xp1.x = inter[0].x + mid1*dx;
		xp2.y = xp1.y = inter[0].y + mid1*dy;
			
		lowy = 0; highy = infinity;
		while(highy - lowy>EPS) {
			mid1y = (lowy * 2 + highy)/3;
			mid2y = (lowy +highy*2)/3;
			zp1.z = mid1y * Math.sin(al);
			zp2.z = mid2y * Math.sin(al);
			zp1.x = xp1.x - dy*Math.cos(al)*mid1y;
			zp2.x = xp2.x - dy*Math.cos(al)*mid2y;
			zp1.y = xp1.y + dx*Math.cos(al)*mid1y;
			zp2.y = xp2.y + dx*Math.cos(al)*mid2y;
			for (i=0; i<4; i++) {
				a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
				b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
				c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
				pp[i].x=zp1.x*a/c - p[i].x*b/c;
				pp[i].y=zp1.y*a/c - p[i].y*b/c;
				pp[i].z=zp1.z*a/c - p[i].z*b/c;
				qq[i].x=zp2.x*a/c - p[i].x*b/c;
				qq[i].y=zp2.y*a/c - p[i].y*b/c;
				qq[i].z=zp2.z*a/c - p[i].z*b/c;
			}
			v1 = ScalarDot3(pp[0], pp[1], pp[3])/Distance(pp[0], pp[1])/Distance(pp[0], pp[3]);
			v2 = ScalarDot3(qq[0], qq[1], qq[3])/Distance(qq[0], qq[1])/Distance(qq[0], qq[3]);
			if (v1*v2<EPS) {
				lowy = mid1y; highy = mid2y;
			} else {
				if (v1>v2) {
					if (v1>0) lowy = mid2y;
					else highy = mid1y;
				} else {
					if (v1<0) lowy = mid2y;
					else highy = mid1y;
				}
			}
		}
		u1 = Distance(pp[0], pp[1])/Distance(pp[0], pp[3]) - cali_width/cali_height;
			
		xp2.x = xp1.x = inter[0].x + mid2*dx;
		xp2.y = xp1.y = inter[0].y + mid2*dy;
		v1 = 1;
		lowy = 0; highy = infinity;
		while(highy - lowy>EPS) {
			mid1y = (lowy * 2 + highy)/3;
			mid2y = (lowy +highy*2)/3;
			zp1.z = mid1y * Math.sin(al);
			zp2.z = mid2y *Math.sin(al);
			zp1.x = xp1.x - dy*Math.cos(al)*mid1y;
			zp2.x = xp2.x - dy*Math.cos(al)*mid2y;
			zp1.y = xp1.y + dx*Math.cos(al)*mid1y;
			zp2.y = xp2.y + dx*Math.cos(al)*mid2y;
			for (i=0; i<4; i++) {
				a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
				b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
				c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
				pp[i].x=zp1.x*a/c - p[i].x*b/c;
				pp[i].y=zp1.y*a/c - p[i].y*b/c;
				pp[i].z=zp1.z*a/c - p[i].z*b/c;
				qq[i].x=zp2.x*a/c - p[i].x*b/c;
				qq[i].y=zp2.y*a/c - p[i].y*b/c;
				qq[i].z=zp2.z*a/c - p[i].z*b/c;
			}
			v1 = ScalarDot3(pp[0], pp[1], pp[3])/Distance(pp[0], pp[1])/Distance(pp[0], pp[3]);
			v2 = ScalarDot3(qq[0], qq[1], qq[3])/Distance(qq[0], qq[1])/Distance(qq[0], qq[3]);
			if (v1*v2<EPS) {
				lowy = mid1y; highy = mid2y;
			} else {
				if (v1>v2) {
					if (v1>0) lowy = mid2y;
					else highy = mid1y;
				} else {
					if (v1<0) lowy = mid2y;
					else highy = mid1y;
				}
			}
		}
		u2 = Distance(pp[0], pp[1])/Distance(pp[0], pp[3]) - cali_width/cali_height;
		if (u1*u2<EPS) {
				low = mid1; high = mid2;
		} else {
			if (u1>u2) {
				if (u1>0) low = mid2;
				else high = mid1;
			} else {
				if (u1<0) low = mid2;
				else high = mid1;
			}
		}
	}
	for (i=0; i<2; i++) {
		a=q[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*q[i].y;
		b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
		c=(q[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(q[i].y-inter[0].y);
		qq[i].x=zp2.x*a/c - q[i].x*b/c;
		qq[i].y=zp2.y*a/c - q[i].y*b/c;
		qq[i].z=zp2.z*a/c - q[i].z*b/c;
	}
	
	return Distance(qq[0], qq[1])*cali_width/Distance(pp[0], pp[1]);
}

function getMeasureArea(cali_width, cali_height, ref_pos, user_pos)
{
	var len1 = getMeasure(cali_width, cali_height, ref_pos[0], ref_pos[1], ref_pos[2], ref_pos[3], user_pos[0], user_pos[1]);
	var len2 = getMeasure(cali_width, cali_height, ref_pos[0], ref_pos[1], ref_pos[2], ref_pos[3], user_pos[1], user_pos[2]);
	var len3 = getMeasure(cali_width, cali_height, ref_pos[0], ref_pos[1], ref_pos[2], ref_pos[3], user_pos[0], user_pos[2]);
	var s1 = (len1 + len2 + len3) * 0.5;
	var area1 = Math.sqrt(s1 * (s1 - len1) * (s1 - len2) * (s1 - len3));

	var len4 = getMeasure(cali_width, cali_height, ref_pos[0], ref_pos[1], ref_pos[2], ref_pos[3], user_pos[2], user_pos[3]);
	var len5 = getMeasure(cali_width, cali_height, ref_pos[0], ref_pos[1], ref_pos[2], ref_pos[3], user_pos[0], user_pos[3]);
	var s2 = (len4 + len5 + len3) * 0.5;
	var area2 = Math.sqrt(s2 * (s2 - len4) * (s2 - len5) * (s2 - len3));

	return {
		perimeter: parseInt((len1 + len2 + len4 + len5) * 10) / 10,
		area: parseInt((area1 + area2) * 10) / 10,
	}
}

function AreaOfTriangle(a, b, c) {
	var p = (a+b+c)/2;
	return Math.sqrt(p*(p-a)*(p-b)*(p-c));
}

function getMeasureVolume(cali_width, cali_height, ref_pos, user_pos, botom_pos)
{	
	var p = [], q = [];
	var interlen, hlen;
	var len1, len2, len3;

	var midp = {}, zp = {}, inter = [], xp = {};
	var i;
	var a, b, c, u1, u2;
	var pp = [{}, {}, {}, {}], qq = [{}, {}, {}, {}, {}];
	var low, high, mid1, mid2, v1, v2;
	var dx, dy;
	var vx, vy, vz, vlen;
	
	var elen;
	var ep = {};

	var area, volume;

	p[0] = ref_pos[0]; p[1] = ref_pos[1]; p[2] = ref_pos[2]; p[3] = ref_pos[3];
	q[0] = user_pos[0]; q[1] = user_pos[1]; q[2] = user_pos[2]; q[3] = user_pos[3]; q[4] = botom_pos;

	for (i=0; i<4; i++) p[i].z = 0;
	for (i=0; i<5; i++) q[i].z = 0;

	inter[0] = LineIntersect(p[0], p[3], p[1], p[2]);
	inter[1] = LineIntersect(p[0], p[1], p[2], p[3]);
	
	interlen = Distance(inter[0], inter[1]);
	midp.x = (inter[0].x + inter[1].x)/2;
	midp.y = (inter[0].y + inter[1].y)/2;
	midp.z = (inter[0].z + inter[1].z)/2;
		
	dx = (inter[1].x-inter[0].x) / interlen;
	dy = (inter[1].y-inter[0].y) / interlen;

	low = 0; high = interlen;;

	var al = Math.PI / 3;
		
	while(high-low > EPS) {
		mid1 = (low * 2 + high) / 3;
		mid2 = (low + high * 2) / 3;

		xp.x = inter[0].x + mid1*dx;
		xp.y = inter[0].y + mid1*dy;
		xp.z = 0;

		hlen = Math.sqrt(interlen*interlen / 4 - Distance(xp, midp)*Distance(xp, midp));

		zp.z = hlen * Math.sin(al);
		zp.x = xp.x - dy*Math.cos(al)*hlen;
		zp.y = xp.y + dx*Math.cos(al)*hlen;

		for (i=0; i<4; i++) {
			a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
			pp[i].x=zp.x*a/c - p[i].x*b/c;
			pp[i].y=zp.y*a/c - p[i].y*b/c;
			pp[i].z=zp.z*a/c - p[i].z*b/c;
		}
		u1 = Distance(pp[0], pp[1])/Distance(pp[0], pp[3]) - cali_width/cali_height;

		xp.x = inter[0].x + mid2*dx;
		xp.y = inter[0].y + mid2*dy;
		xp.z = 0;
		
		hlen = Math.sqrt(interlen * interlen / 4 - Distance(xp, midp) * Distance(xp, midp));

		zp.z = hlen * Math.sin(al);
		zp.x = xp.x - dy*Math.cos(al)*hlen;
		zp.y = xp.y + dx*Math.cos(al)*hlen;

		for (i = 0; i < 4; i++) {
			a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
			pp[i].x=zp.x*a/c - p[i].x*b/c;
			pp[i].y=zp.y*a/c - p[i].y*b/c;
			pp[i].z=zp.z*a/c - p[i].z*b/c;
		}
		u2 = Distance(pp[0], pp[1])/Distance(pp[0], pp[3]) - cali_width/cali_height;

		if (u1*u2<EPS) {
			low = mid1; high = mid2;
		} else {
			if (u1>u2) {
				if (u1>0) low = mid2;
				else high = mid1;
			} else {
				if (u1<0) low = mid2;
				else high = mid1;
			}
		}
	}
	for (i=0; i<5; i++) {
		a=q[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*q[i].y;
		b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
		c=(q[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(q[i].y-inter[0].y);
		qq[i].x=zp.x*a/c - q[i].x*b/c;
		qq[i].y=zp.y*a/c - q[i].y*b/c;
		qq[i].z=zp.z*a/c - q[i].z*b/c;
	}

	len1 = Distance(qq[0], qq[1])*cali_width/Distance(pp[0], pp[1]);
	len2 = Distance(qq[0], qq[3])*cali_width/Distance(pp[0], pp[1]);
	len3 = Distance(qq[1], qq[3])*cali_width/Distance(pp[0], pp[1]);
	area = AreaOfTriangle(len1, len2, len3);
	len1 = Distance(qq[2], qq[1])*cali_width/Distance(pp[0], pp[1]);
	len2 = Distance(qq[2], qq[3])*cali_width/Distance(pp[0], pp[1]);
	area += AreaOfTriangle(len1, len2, len3);
	
	volume = area;
	v2 = Distance(qq[0], qq[4]);
	v1 = ScalarDot3(qq[0], qq[4], zp)/v2;
		
	ep.x = qq[0].x + v1*(qq[4].x-qq[0].x)/v2;
	ep.y = qq[0].y + v1*(qq[4].y-qq[0].y)/v2;
	ep.z = qq[0].z + v1*(qq[4].z-qq[0].z)/v2;
	elen = Distance(zp, ep)*Distance(qq[0], qq[4])/Distance(qq[4], ep)*cali_width / Distance(pp[0], pp[1]);

	low = 0; high = PI;
	while(high-low > EPS) {
		mid1 = (low*2+high)/3;
		mid2 = (low+high*2)/3;

		zp.z = hlen * Math.sin(mid1);
		zp.x = xp.x - dy*Math.cos(mid1)*hlen;
		zp.y = xp.y + dx*Math.cos(mid1)*hlen;

		vx = (zp.y-inter[0].y)*(zp.z-inter[1].z)-(zp.z-inter[0].z)*(zp.y-inter[1].y);
		vy = (zp.z-inter[0].z)*(zp.x-inter[1].x)-(zp.x-inter[0].x)*(zp.z-inter[1].z);
		vz = (zp.x-inter[0].x)*(zp.y-inter[1].y)-(zp.y-inter[0].y)*(zp.x-inter[1].x);
		vlen = Math.sqrt(vx*vx+vy*vy+vz*vz);
		vx/=vlen; 
		vy/=vlen; 
		vz/=vlen;

		for (i=0; i<4; i++) {
			a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
			pp[i].x=zp.x*a/c - p[i].x*b/c;
			pp[i].y=zp.y*a/c - p[i].y*b/c;
			pp[i].z=zp.z*a/c - p[i].z*b/c;
		}
		for (i=0; i<5; i++) {
			a=q[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*q[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(q[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(q[i].y-inter[0].y);
			qq[i].x=zp.x*a/c - q[i].x*b/c;
			qq[i].y=zp.y*a/c - q[i].y*b/c;
			qq[i].z=zp.z*a/c - q[i].z*b/c;
		}
		v2 = Distance(qq[0], qq[4]);
		v1 = ScalarDot3(qq[0], qq[4], zp)/v2;
		ep.x = qq[0].x + v1*(qq[4].x-qq[0].x)/v2;
		ep.y = qq[0].y + v1*(qq[4].y-qq[0].y)/v2;
		ep.z = qq[0].z + v1*(qq[4].z-qq[0].z)/v2;

		u1 = Distance(ep, zp)-Math.abs(zp.x*vx+zp.y*vy+zp.z*vz);

		zp.z = hlen * Math.sin(mid2);
		zp.x = xp.x - dy*Math.cos(mid2)*hlen;
		zp.y = xp.y + dx*Math.cos(mid2)*hlen;

		vx = (zp.y-inter[0].y)*(zp.z-inter[1].z)-(zp.z-inter[0].z)*(zp.y-inter[1].y);
		vy = (zp.z-inter[0].z)*(zp.x-inter[1].x)-(zp.x-inter[0].x)*(zp.z-inter[1].z);
		vz = (zp.x-inter[0].x)*(zp.y-inter[1].y)-(zp.y-inter[0].y)*(zp.x-inter[1].x);
		vlen = Math.sqrt(vx*vx+vy*vy+vz*vz);
		vx/=vlen; 
		vy/=vlen; 
		vz/=vlen;
		for (i=0; i<4; i++) {
			a=p[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*p[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(p[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(p[i].y-inter[0].y);
			pp[i].x=zp.x*a/c - p[i].x*b/c;
			pp[i].y=zp.y*a/c - p[i].y*b/c;
			pp[i].z=zp.z*a/c - p[i].z*b/c;
		}
		for (i=0; i<5; i++) {
			a=q[i].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*q[i].y;
			b=inter[0].x*(inter[1].y-inter[0].y) - (inter[1].x-inter[0].x)*inter[0].y;
			c=(q[i].x-inter[0].x)*(inter[1].y-inter[0].y)-(inter[1].x-inter[0].x)*(q[i].y-inter[0].y);
			qq[i].x=zp.x*a/c - q[i].x*b/c;
			qq[i].y=zp.y*a/c - q[i].y*b/c;
			qq[i].z=zp.z*a/c - q[i].z*b/c;
		}
		v2 = Distance(qq[0], qq[4]);
		v1 = ScalarDot3(qq[0], qq[4], zp)/v2;
		ep.x = qq[0].x + v1*(qq[4].x-qq[0].x)/v2;
		ep.y = qq[0].y + v1*(qq[4].y-qq[0].y)/v2;
		ep.z = qq[0].z + v1*(qq[4].z-qq[0].z)/v2;

		u2 = Distance(ep, zp)-Math.abs(zp.x*vx+zp.y*vy+zp.z*vz);
		if (u1<u2) {
			high = mid2;
		} else {
			low = mid1;
		}
	}

	elen = Distance(zp, ep)*Distance(qq[0], qq[4])/Distance(qq[4], ep)*cali_width / Distance(pp[0], pp[1]);
	volume = volume * elen;

	return {
		area: parseInt(area * 100) / 100,
		volume: parseInt(volume * 100) / 100,
		elen: parseInt(elen * 100) / 100,
	}
}