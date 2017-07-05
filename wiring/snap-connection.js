//

var DIRECTIONS = {TOP: 1, RIGHT: 2, BOTTOM: 3, LEFT: 4};

Snap.plugin(function(Snap, Element, Paper) {
    // Create a connection
    Paper.prototype.connection = function(start, end, info, connection) {
        var DISTANCE_HOLDER = 15;

        if(start.mask && start.from && start.to) {
            connection = start;
            info = connection.info;
            start = connection.from;
            end = connection.to;
        }

        // fn get pair point
        function getPoint(obj, holder) {
            var x = obj.getBBox().cx, y = obj.getBBox().cy;

            if(obj.holders) {
                for(var i = 0; i < obj.holders.length; i++) {
                    if(obj.holders[i].id === holder) {
                        if(obj.holders[i].direct == 1 || obj.holders[i].direct == 11 || obj.holders[i].direct == 12) {
                            if(obj.info.animation.rotate == 0) {
                                x = obj.holders[i].bb.cx;
                                y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                            } else if(obj.info.animation.rotate == 1) {
                                x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                y = obj.holders[i].bb.cy;
                            } else if(obj.info.animation.rotate == 2) {
                                x = obj.holders[i].bb.cx;
                                y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                            } else if(obj.info.animation.rotate == 3) {
                                x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                y = obj.holders[i].bb.cy;
                            }
                        } else if(obj.holders[i].direct == 2 || obj.holders[i].direct == 21 || obj.holders[i].direct == 22) {
                            if(obj.info.animation.rotate == 0) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                } else {
                                    x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                }
                            } else if(obj.info.animation.rotate == 1) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                                } else {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                                }
                            } else if(obj.info.animation.rotate == 2) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                } else {
                                    x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                }
                            } else if(obj.info.animation.rotate == 3) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                                } else {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                                }
                            }
                        } else if(obj.holders[i].direct == 3 || obj.holders[i].direct == 31 || obj.holders[i].direct == 32) {
                            if(obj.info.animation.rotate == 0) {
                                x = obj.holders[i].bb.cx;
                                y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                            } else if(obj.info.animation.rotate == 1) {
                                x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                y = obj.holders[i].bb.cy;
                            } else if(obj.info.animation.rotate == 2) {
                                x = obj.holders[i].bb.cx;
                                y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                            } else if(obj.info.animation.rotate == 3) {
                                x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                y = obj.holders[i].bb.cy;
                            }
                        } else if(obj.holders[i].direct == 4 || obj.holders[i].direct == 41 || obj.holders[i].direct == 42) {
                            if(obj.info.animation.rotate == 0) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                } else {
                                    x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                }
                            } else if(obj.info.animation.rotate == 1) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                                } else {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                                }
                            } else if(obj.info.animation.rotate == 2) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.x + DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                } else {
                                    x = obj.holders[i].bb.x2 - DISTANCE_HOLDER;
                                    y = obj.holders[i].bb.cy;
                                }
                            } else if(obj.info.animation.rotate == 3) {
                                if(!obj.info.animation.flip) {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y2 - DISTANCE_HOLDER;
                                } else {
                                    x = obj.holders[i].bb.cx;
                                    y = obj.holders[i].bb.y + DISTANCE_HOLDER;
                                }
                            }
                        } else {
                            x = obj.holders[i].bb.cx;
                            y = obj.holders[i].bb.cy;
                        }
                        break;
                    }
                }
            }
            return {x: x, y: y};
        }

        //get point to draw
        var point = {
            start: getPoint(start, info.fromHolder),
            end: getPoint(end, info.toHolder)
        };

        var rotate = {
            start: function(start) {
                if(start.id !== -1000) {
                    return start.info.animation.rotate;
                }
                return 0;
            },
            end: function(end) {
                if(end.id !== -1000) {
                    return end.info.animation.rotate;
                }
                return 0;
            }
        };
        var flip = {
            start: function(start) {
                if(start.id !== -1000) {
                    return start.info.animation.flip;
                }
                return false;
            },
            end: function(end) {
                if(end.id !== -1000) {
                    return end.info.animation.flip;
                }
                return false;
            }
        };
        var points = this.getPathConnection(
            point.start,            // startPoint
            info.fromHolder,        // startDirection
            start.getBBox(),        // startBound
            rotate.start(start),    // startRotate
            flip.start(start),      // startFlip
            point.end,              // endPoint
            info.toHolder,          // endDirection
            end.getBBox(),          // endBound
            rotate.end(end),        // endRotate
            flip.end(end)           // endFlip
        );

        function getPathDistanceHolder(points) {
            var pointStart = points[0];
            var pointNext = points[1];
            var pathStart = '';
            var pointEnd = points[points.length - 1];
            var pointPre = points[points.length - 2];
            var pathEnd = '';

            // Begin
            if(pointStart.y === pointNext.y) {
                if(pointStart.x < pointNext.x) {
                    pathStart = "M" + (pointStart.x - DISTANCE_HOLDER) + ',' + pointStart.y + 'L' + pointStart.x + ',' + pointStart.y;
                } else {
                    pathStart = "M" + (pointStart.x + DISTANCE_HOLDER) + ',' + pointStart.y + 'L' + pointStart.x + ',' + pointStart.y;
                }
            } else if(pointStart.x === pointNext.x) {
                if(pointStart.y < pointNext.y) {
                    pathStart = "M" + pointStart.x + ',' + (pointStart.y - DISTANCE_HOLDER) + 'L' + pointStart.x + ',' + pointStart.y;
                } else {
                    pathStart = "M" + pointStart.x + ',' + (pointStart.y + DISTANCE_HOLDER) + 'L' + pointStart.x + ',' + pointStart.y;
                }
            }

            // End
            if(pointEnd.y === pointPre.y) {
                if(pointEnd.x > pointPre.x) {
                    pathEnd = "M" + (pointEnd.x + DISTANCE_HOLDER) + ',' + pointEnd.y + 'L' + pointEnd.x + ',' + pointEnd.y;
                } else {
                    pathEnd = "M" + (pointEnd.x - DISTANCE_HOLDER) + ',' + pointEnd.y + 'L' + pointEnd.x + ',' + pointEnd.y;
                }
            } else if(pointEnd.x === pointPre.x) {
                if(pointEnd.y > pointPre.y) {
                    pathEnd = "M" + pointEnd.x + ',' + (pointEnd.y + DISTANCE_HOLDER) + 'L' + pointEnd.x + ',' + pointEnd.y;
                } else {
                    pathEnd = "M" + pointEnd.x + ',' + (pointEnd.y - DISTANCE_HOLDER) + 'L' + pointEnd.x + ',' + pointEnd.y;
                }
            }

            return {pathStart: pathStart, pathEnd: pathEnd};
        }

        var path = this.cornerRadius(points, 5);

        if(connection && connection.mask) { // update
            connection.line1.attr({path: path, stroke: info.color, 'stroke-width': 4});
            connection.line2.attr({path: path, 'stroke-width': 2});
            connection.mask.attr({path: path, 'stroke-width': 14});

            // Change points
            connection.mask.points = points;

            // Change connect from path to equipment
            if(!!connection.lineStart && !!connection.lineEnd) {
                var paths = getPathDistanceHolder(points);
                connection.lineStart.line1.attr({path: paths.pathStart, stroke: info.color, 'stroke-width': 4});
                connection.lineStart.line2.attr({path: paths.pathStart, 'stroke-width': 2});
                connection.lineStart.mask.attr({path: paths.pathStart, 'stroke-width': 14});
                connection.lineEnd.line1.attr({path: paths.pathEnd, stroke: info.color, 'stroke-width': 4});
                connection.lineEnd.line2.attr({path: paths.pathEnd, 'stroke-width': 2});
                connection.lineEnd.mask.attr({path: paths.pathEnd, 'stroke-width': 14});
            }
        } else { // create new
            var conn = {
                line1: this.path(path).attr({stroke: info.color, fill: 'none', 'stroke-width': 4, cursor: 'pointer'}),
                line2: this.path(path).attr({stroke: '#ffffff', fill: 'none', 'stroke-width': 2, cursor: 'pointer'}),
                mask: this.path(path).attr({
                    stroke: '#00458F',
                    fill: 'none',
                    'stroke-width': 14,
                    'stroke-opacity': .001,
                    cursor: 'pointer'
                }),
                from: start,
                to: end,
                info: info
            };

            conn.mask.parentNode = conn;
            conn.mask.points = points;

            conn.mask.selectChange = function(flag) {
                if(flag) {
                    conn.mask.attr({'stroke-opacity': .1});
                } else {
                    conn.mask.attr({'stroke-opacity': .001});
                }
            };

            // Create connect from path to equipment
            if(points.length > 2 && start.objType === OBJECTS.EQUIPMENT && end.objType === OBJECTS.EQUIPMENT) { // Check from holder to holder
                var paths = getPathDistanceHolder(points);
                conn.lineStart = {
                    line1: this.path(paths.pathStart).attr({
                        stroke: info.color,
                        fill: 'none',
                        'stroke-width': 4,
                        cursor: 'pointer'
                    }),
                    line2: this.path(paths.pathStart).attr({
                        stroke: '#ffffff',
                        fill: 'none',
                        'stroke-width': 2,
                        cursor: 'pointer'
                    }),
                    mask: this.path(paths.pathStart).attr({
                        stroke: '#00458F',
                        fill: 'none',
                        'stroke-width': 14,
                        'stroke-opacity': .001,
                        cursor: 'pointer'
                    })
                };

                conn.lineEnd = {
                    line1: this.path(paths.pathEnd).attr({
                        stroke: info.color,
                        fill: 'none',
                        'stroke-width': 4,
                        cursor: 'pointer'
                    }),
                    line2: this.path(paths.pathEnd).attr({
                        stroke: '#ffffff',
                        fill: 'none',
                        'stroke-width': 2,
                        cursor: 'pointer'
                    }),
                    mask: this.path(paths.pathEnd).attr({
                        stroke: '#00458F',
                        fill: 'none',
                        'stroke-width': 14,
                        'stroke-opacity': .001,
                        cursor: 'pointer'
                    })
                };
            }

            return conn;
        }
    };

    // Build connection from start point to end point
    // @param startPoint Start point {x,y}
    // @param startPos position of start point: 1 = top, 2 = right , 3 =  bottom, 4 = left
    // @param startBound Boundary of start: {x,y,w,h}
    // @param pEnd
    // @param endPos
    Paper.prototype.getPathConnection = function(startPoint, startDirection, startBound, startRotate, startFlip, endPoint, endDirection, endBound, endRotate, endFlip) {

        var gap = 15;

        function growBounds(p, b, gap) {
            var diff_xa = b.x - p.x;
            var diff_xb = p.x - b.x2;
            var gap_x = 0;
            if (diff_xa >= 0) {
                gap_x = diff_xa;
            }
            else if (diff_xb >= 0) {
                gap_x = diff_xb;
            }

            var diff_ya = b.y - p.y;
            var diff_yb = p.y - b.y2;
            var gap_y = 0;
            if (diff_ya >= 0) {
                gap_y = diff_ya;
            }
            else if (diff_yb >= 0) {
                gap_y = diff_yb;
            }

            return {
                x:  b.x  - gap_x - gap,
                y:  b.y  - gap_y - gap,
                x2: b.x2 + gap_x + gap,
                y2: b.y2 + gap_y + gap
            };
        }

        var startBox = growBounds(startPoint, startBound, gap);
        var endBox  = growBounds(endPoint, endBound, gap);

        function fixDirection(direction, rotate, flip)
        {
            var d = direction;
            if (d == 1 || d == 11 || d == 12) {
                d = 1;
            }
            else if (d == 2 || d == 21 | d == 22) {
                d = 2;
            }
            else if (d == 3 || d == 31 | d == 32) {
                d = 3;
            }
            else if (d == 4 || d == 41 | d == 42) {
                d = 4;
            }

            var flippedDirection;
            if (flip) {
                flippedDirection = [2, 3, 0, 1][d-1];
            }
            else {
                flippedDirection = direction - 1;
            }

            var delta = flippedDirection - rotate;
            if (delta < 0) {
                return delta + 5;
            }
            else {
                return delta + 1;
            }
        }

        // Ensure that the directions are adjusted for rotation and flip status
        var fixedStartDirection = fixDirection(startDirection, startRotate, startFlip);
        var fixedEndDirection = fixDirection(endDirection, endRotate, endFlip);

        function findRouteDistances(p, boxes) {
            // North and South routes
            var d = {n: 1e9, s: 1e9, e: 1e9, w: 1e9};
            var nd = [];
            var sd = [];
            for (var i = 0; i < boxes.length; i++) {
                var b = boxes[i];
                if (p.x > b.x && p.x < b.x2) {
                    var b_y_min = Math.min(b.y, b.y2);
                    var b_y_max = Math.max(b.y, b.y2);
                    if (p.y >= b_y_max) {
//                        console.log("Moving N");
                        nd.push(p.y - b_y_max)
                    }
                    else if (p.y <= b_y_min) {
//                        console.log("Moving S");
                        sd.push(b_y_min - p.y);
                    }
                }
            }

            if (nd.length > 0) {
                d.n = Math.min.apply(null, nd);
            }
            if (sd.length > 0) {
                d.s = Math.min.apply(null, sd);
            }

            // East and West routes
            var ed = [];
            var wd = [];
            for (var i = 0; i < boxes.length; i++) {
                var b = boxes[i];
                if (p.y > b.y && p.y < b.y2) {
                    var b_x_min = Math.min(b.x, b.x2);
                    var b_x_max = Math.max(b.x, b.x2);
                    if (p.x >= b_x_max) {
//                        console.log("Moving W");
                        wd.push(p.x - b_x_max);
                    }
                    else if (p.x <= b_x_min) {
//                        console.log("Moving E");
                        ed.push(b_x_min - p.x);
                    }
                }
            }

            if (ed.length > 0) {
                d.e = Math.min.apply(null, ed);
            }
            if (wd.length > 0) {
                d.w = Math.min.apply(null, wd);
            }

            return d;
        }

        function findNearestPointOnBox(p, b, d) {
//            console.log("d %d", d);
            if (d == 1 || d == 11 || d == 12) {
                return {x: p.x,  y: b.y };
            }
            else if (d == 2 || d == 21 | d == 22) {
                return {x: b.x2, y: p.y };
            }
            else if (d == 3 || d == 31 || d == 32) {
                return {x: p.x,  y: b.y2};
            }
            else if (d == 4 || d == 41 || d == 42) {
                return {x: b.x,  y: p.y};
            }
            else if (d == -1) {
                return {x: p.x, y: p.y};
            }
            else {
                console.log("unknown direction %d", d);
            }
        }

        function route(p_src, p_dst, boxes) {
            var path = [p_src];
            var p_cur = p_src;
            var i = 10;
            while (i && (p_cur.x != p_dst.x || p_cur.y != p_dst.y)) {
//                console.log("i %d", i);
                var avail = findRouteDistances(p_cur, boxes);
                var x_want = p_dst.x - p_cur.x;
                var y_want = p_dst.y - p_cur.y;
                var want_ew = x_want < 0 ? 'w' : 'e';
                var want_ns = y_want < 0 ? 'n' : 's';
//                console.log("avail   %O", avail);
//                console.log("x_want  %d", x_want);
//                console.log("y_want  %d", y_want);
//                console.log("want_ew %s", want_ew);
//                console.log("want_ns %s", want_ns);
                if (Math.abs(x_want) > 0 && avail[want_ew] > 0) {
                    var d = Math.min(avail[want_ew], Math.abs(x_want));
                    if (want_ew == 'w') {
                        d *= -1;
                    }
//                    console.log("Moving X %d", d);
                    p_cur = {x: p_cur.x + d, y: p_cur.y};
                }
                else if (Math.abs(y_want) > 0 && avail[want_ns] > 0) {
                    var d = Math.min(avail[want_ns], Math.abs(y_want));
                    if (want_ns == 'n') {
                        d *= -1;
                    }
//                    console.log("Moving Y %d", d);
                    p_cur = {x: p_cur.x, y: p_cur.y + d};
                }
                else {
                    // cannot make progress, search for a way forward
//                    console.log("Stuck, searching for route");
                    var test = 1;
                    var mask = {x: 1, y: 1};
                    if (x_want == 0) {
                        mask = {x: 1, y: 0};
                    }
                    else if (y_want == 0) {
                        mask = {x: 0, y: 1};
                    }
                    var j = 100;
                    while (j) {
                        var p_tstp = {x: p_cur.x + (mask.x * test), y: p_cur.y + (mask.y * test)};
                        var p_tstm = {x: p_cur.x - (mask.x * test), y: p_cur.y - (mask.y * test)};
//                        console.log("Checking %O and %O", p_tstp, p_tstm);
                        var plus = findRouteDistances(p_tstp, boxes);
                        if ((avail[want_ns] == 0 && plus[want_ns] > 0) || (avail[want_ew] == 0 && plus[want_ew] > 0)) {
                            p_cur = p_tstp;
//                            console.log("Found a path A moving to (%d, %d)", p_cur.x, p_cur.y);
                            break;
                        }

                        var minus = findRouteDistances(p_tstm, boxes);
                        if ((avail[want_ns] == 0 && plus[want_ns] > 0) || (avail[want_ew] == 0 && plus[want_ew] > 0)) {
                            p_cur = p_tstm;
//                            console.log("Found a path B moving to (%d, %d)", p_cur.x, p_cur.y);
                            break;
                        }
                        test += gap;
                        j -= 1;
                    }
                }
                path.push(p_cur);
                i -= 1;
            }
//            console.log("p_dst %O", p_dst);
//            console.log("p_cur %O", p_cur);
            return path;
        }

        var ps = findNearestPointOnBox(startPoint, startBox, fixedStartDirection);
        var pe = findNearestPointOnBox(endPoint, endBox, fixedEndDirection);

//        console.log("Routing");
//        console.log("startDirection %d", startDirection);
//        console.log("endDirection   %d", endDirection);
//        console.log("p[0]  (%d, %d)", startPoint.x, startPoint.y);
//        console.log("p[1]  (%d, %d)", ps.x, ps.y);
//        console.log("p[-2] (%d, %d)", pe.x, pe.y);
//        console.log("p[-1] (%d, %d)", endPoint.x, endPoint.y);

        var boxes = [startBox];
        if (endDirection != -1) {
            boxes.push(endBox);
        }
        var points = route(ps, pe, boxes);
        var mpoints = [startPoint];
        mpoints = mpoints.concat(points);
        if (endDirection != -1) {
            mpoints.push(endPoint);
        }
//        console.log("moints %O", mpoints);
//        console.log("--------");
        return mpoints;
    };

    // Get corner
    Paper.prototype.cornerRadius = function(points, radiusCorner) {
        var path = 'M' + points[0].x + "," + points[0].y;

        // get corner
        if(points.length > 2) {
            for(var i = 1; i < points.length - 1; i++) {
//                var p1 = {
//                    x: points[i - 1].x,
//                    y: points[i - 1].y
//                }, p2 = {
//                    x: points[i].x,
//                    y: points[i].y
//                }, p3 = {
//                    x: points[i + 1].x,
//                    y: points[i + 1].y
//                };
//                var dis1 = Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2)),
//                    dis2 = Math.sqrt(Math.pow(p3.y - p2.y, 2) + Math.pow(p3.x - p2.x, 2));
//                if(dis1 < radiusCorner * 2 || dis2 < radiusCorner * 2) {
                    path += 'L' + points[i].x + ',' + points[i].y;
//                } else {
//                    if((p1.x === p2.x && p1.x === p3.x) || (p1.y === p2.y && p1.y === p3.y)) { // Line
//                        path += 'L' + points[i].x + ',' + points[i].y;
//                    } else if(p1.x === p2.x && p1.y < p2.y) {
//                        if(p3.y === p2.y && p3.x < p2.x) {
//                            path += 'L' + points[i].x + ',' + (points[i].y - radiusCorner) + 'Q' + points[i].x + ',' + points[i].y + ',' + (points[i].x - radiusCorner) + ',' + points[i].y;
//                        } else {
//                            path += 'L' + points[i].x + ',' + (points[i].y - radiusCorner) + 'Q' + points[i].x + ',' + points[i].y + ',' + (points[i].x + radiusCorner) + ',' + points[i].y;
//                        }
//                    } else if(p1.x === p2.x && p1.y > p2.y) {
//                        if(p3.y === p2.y && p3.x < p2.x) {
//                            path += 'L' + points[i].x + ',' + (points[i].y + radiusCorner) + 'Q' + points[i].x + ',' + points[i].y + ',' + (points[i].x - radiusCorner) + ',' + points[i].y;
//                        } else {
//                            path += 'L' + points[i].x + ',' + (points[i].y + radiusCorner) + 'Q' + points[i].x + ',' + points[i].y + ',' + (points[i].x + radiusCorner) + ',' + points[i].y;
//                        }
//                    } else if(p1.y === p2.y && p1.x < p2.x) {
//                        if(p3.x === p2.x && p3.y < p2.y) {
//                            path += 'L' + (points[i].x - radiusCorner) + ',' + points[i].y + 'Q' + points[i].x + ',' + points[i].y + ',' + points[i].x + ',' + (points[i].y - radiusCorner);
//                        } else {
//                            path += 'L' + (points[i].x - radiusCorner) + ',' + points[i].y + 'Q' + points[i].x + ',' + points[i].y + ',' + points[i].x + ',' + (points[i].y + radiusCorner);
//                        }
//                    } else if(p1.y === p2.y && p1.x > p2.x) {
//                        if(p3.x === p2.x && p3.y < p2.y) {
//                            path += 'L' + (points[i].x + radiusCorner) + ',' + points[i].y + 'Q' + points[i].x + ',' + points[i].y + ',' + points[i].x + ',' + (points[i].y - radiusCorner);
//                        } else {
//                            path += 'L' + (points[i].x + radiusCorner) + ',' + points[i].y + 'Q' + points[i].x + ',' + points[i].y + ',' + points[i].x + ',' + (points[i].y + radiusCorner);
//                        }
//                    }
//                }
            }
        }
        path += 'L' + points[points.length - 1].x + ',' + points[points.length - 1].y;

        return path;
    };
});
