import {

    RouteReuseStrategy,

    ActivatedRouteSnapshot,

    DetachedRouteHandle,

} from "@angular/router";

export class RouteReuseService implements RouteReuseStrategy {

    private handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('SHOUKD DETACH')

        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }

        let shouldReuse = false;

        if (route.routeConfig.data) {
            route.routeConfig.data['reuse'] ? shouldReuse = true : shouldReuse = false;
        }

        return shouldReuse;

    }

    store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {

        console.log('STORE')

        if (handler) {
            this.handlers[this.getUrl(route) as string] = handler;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {

        console.log('SHOUD ATTACH', route)


        return !!this.handlers[this.getUrl(route) as string];

    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        console.log('SHOUD RETRIEVE')

        if (!route.routeConfig || route.routeConfig.loadChildren)

            return null;



        return this.handlers[this.getUrl(route) as string];

    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
        console.log('SHOUD REUSE', future, current)
        let reUseUrl = false;

        if (future.routeConfig) {

            if (future.routeConfig.data) {

                reUseUrl = future.routeConfig.data['reuse'];

            }

        }

        const defaultReuse = (future.routeConfig === current.routeConfig);

        return reUseUrl || defaultReuse;

    }

    getUrl(route: ActivatedRouteSnapshot): string | undefined {
        if (!route.routeConfig) return;
        const url = route.routeConfig.path;
        return url;
    }

}