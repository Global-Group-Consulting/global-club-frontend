## Execute in Production mode

```bash
docker compose -f docker-compose.prod.yml up
```

## Enter shell inside container

```bash
docker exec -it global-club-frontend-prod /bin/sh    
```

## Build and push image

```bash
ionic cap sync
```
