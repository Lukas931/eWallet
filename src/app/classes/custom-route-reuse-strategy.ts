import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
  } from "@angular/router";

  
export class CustomRouteReuseStrategy extends RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};
    shouldReuse: boolean = false;
    reuseOnlyFromArray = ['detail/:id'];

/****************************************************** */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
      
        if (!route.routeConfig) return null;
        let key = '';
        if(route.data['reuseRoute']) {            
            if(route.routeConfig != undefined){
                key = route.routeConfig.path as string;
            }
        }
        return this.handlers[key];
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        let key = '';
        if(route.data['reuseRoute']) {            
            if(route.routeConfig != undefined){
                key = route.routeConfig.path as string;
            }
        }
        return !!route.routeConfig && !!this.handlers[key] && this.shouldReuse;
       
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
       
        let search = '';
        if(route.routeConfig !== null){
            if(route.routeConfig.path) {
                search = route.routeConfig.path;
            }
            this.shouldReuse = false;
            if(this.reuseOnlyFromArray.includes(search)) {
                this.shouldReuse = true;
            } 
        }
        if(route.params){
            return route.data['reuseRoute'];
        }
        return false;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      
        return future.data['reuseRoute'] || false;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  
        if(route.data['reuseRoute']) {
            let key = '';
            if(route.routeConfig != undefined){
                key = route.routeConfig.path as string;
            }
            this.handlers[key] = handle;
        }
    }
}
 