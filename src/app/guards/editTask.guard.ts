import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'app/services/app.service';


export const editTaskGuard = () => {

    const router = inject(Router);
    const service = inject(TasksService);

    if(service.taskEdit.idTarea !== 0){
        return true;
    }else{
        router.navigate(['/login'])
        return false
    }

}