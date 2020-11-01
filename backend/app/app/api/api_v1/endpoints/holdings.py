from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Holding])
def read_holdings(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve holdings.
    """
    if crud.user.is_superuser(current_user):
        holdings = crud.holding.get_multi(db, skip=skip, limit=limit)
    else:
        holdings = crud.holding.get_multi_by_owner(
            db=db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return holdings


@router.post("/", response_model=schemas.Holding)
def create_holding(
    *,
    db: Session = Depends(deps.get_db),
    holding_in: schemas.HoldingCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new holding.
    """
    holding = crud.holding.create_with_owner(db=db, obj_in=holding_in, owner_id=current_user.id)
    return holding


@router.put("/{id}", response_model=schemas.Holding)
def update_holding(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    holding_in: schemas.HoldingUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an holding.
    """
    holding = crud.holding.get(db=db, id=id)
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    if not crud.user.is_superuser(current_user) and (holding.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    holding = crud.holding.update(db=db, db_obj=holding, obj_in=holding_in)
    return holding


@router.get("/{id}", response_model=schemas.Holding)
def read_holding(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get holding by ID.
    """
    holding = crud.holding.get(db=db, id=id)
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    if not crud.user.is_superuser(current_user) and (holding.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return holding


@router.delete("/{id}", response_model=schemas.Holding)
def delete_holding(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an holding.
    """
    holding = crud.holding.get(db=db, id=id)
    if not holding:
        raise HTTPException(status_code=404, detail="Holding not found")
    if not crud.user.is_superuser(current_user) and (holding.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    holding = crud.holding.remove(db=db, id=id)
    return holding
