# angularModuleFederation

## application

```sh
npx create-nx-workspace@latest angularModuleFederation --preset=apps
```

## add dependend lib

```sh
cd ng-mf
npx nx add @nx/angular
```

## add host app dashboard MFE

```sh
nx g @nx/angular:host apps/dashboard --prefix=angularModuleFederation
```

## add login MFE

```sh
nx g @nx/angular:remote apps/login --prefix=angularModuleFederation --host=dashboard
```

## add user library

```sh
nx g @nx/angular:lib libs/shared/data-access-user
```

## add user service in the library

```sh
nx g @nx/angular:service user --project=data-access-user
```

## run the login MFE

```sh
nx run login:serve
```
