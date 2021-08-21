export function checkIndent(positions, elemId, forX = true) {


    var point1 = {x: positions[elemId].x, y: positions[elemId].y}
    var point2 = {x: positions[elemId].x1, y: positions[elemId].y}
    var point3 = {x: positions[elemId].x1, y: positions[elemId].y1}
    var point4 = {x: positions[elemId].x, y: positions[elemId].y1}


    let middleX=Math.abs(point1.x-point2.x)/2
    middleX+=point1.x
    let middleY=Math.abs(point1.y-point4.y)/2
    middleY+=point1.y

    let ret = -1

    for (var i in positions) {
        // console.log(i.toString()+" "+elemId.toString())
        if (i.toString() === elemId.toString()) {
            // console.log(i)
            // console.log(elemId)
        } else {
            var objectPoint1 = {x: positions[i].x, y: positions[i].y}
            var objectPoint2 = {x: positions[i].x1, y: positions[i].y}
            var objectPoint3 = {x: positions[i].x1, y: positions[i].y1}
            var objectPoint4 = {x: positions[i].x, y: positions[i].y1}

            let objectMiddleX=Math.abs((objectPoint1.x-objectPoint2.x))/2
            objectMiddleX+=objectPoint1.x
            let objectMiddleY=Math.abs(objectPoint1.y-objectPoint4.y)/2
            objectMiddleY+=objectPoint1.y



            if(forX&&Math.abs(middleX-objectMiddleX)<15&&(point1.y-objectPoint4.y<15 && point1.y-objectPoint4.y>-(point4.y-point1.y+35+positions[elemId].y1-positions[elemId].y))){
                ret=objectMiddleX+(point1.x-point2.x)/2
            }
            if(!forX&&Math.abs(middleY-objectMiddleY)<15&&(objectPoint4.x - point2.x < 15 && objectPoint4.x - point2.x > -(positions[i].x1 - positions[i].x + 15 + positions[elemId].x1 - positions[elemId].x))){
                ret=objectMiddleY+(point1.y-point4.y)/2
            }

            let screenWidth=(document.getElementById("clearArea").offsetWidth)


            if (forX&&objectPoint4.x - point2.x < 4 && objectPoint4.x - point2.x > -(positions[i].x1 - positions[i].x + 4 + positions[elemId].x1 - positions[elemId].x) && ((point2.y >= objectPoint1.y && point2.y <= objectPoint4.y) || (point3.y >= objectPoint1.y && point3.y <= objectPoint4.y)
                ||(objectPoint1.y-point1.y)>=0&&objectPoint4.y-point4.y<=0)  )
                return [false,ret]

            if(!forX&&((point1.x<=objectPoint2.x&&point1.x>=objectPoint1.x)||(point2.x<=objectPoint2.x&&point2.x>=objectPoint1.x
            ||(objectPoint1.x-point1.x>=0&&objectPoint3.x-point3.x<=0)

            ))&&(point1.y-objectPoint4.y<4 && point1.y-objectPoint4.y>-(objectPoint4.y-objectPoint1.y+4+positions[elemId].y1-positions[elemId].y))){

                return [false,ret]
            }



        }


    }
    return [true,ret]
}