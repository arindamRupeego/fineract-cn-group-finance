/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Error} from '../domain/error.model';
import {HttpClients} from '../http/http.service';
import {Password} from './domain/password.model';
import {UserWithPassword} from './domain/user-with-password.model';
import {Role} from './domain/role.model';
import {RoleIdentifier} from './domain/role-identifier.model';
import {User} from './domain/user.model';
import {PermittableGroup} from '../anubis/permittable-group.model';

@Injectable()
export class IdentityService {

  private static encodePassword(password: string): string {
    return btoa(password);
  }

  private baseUrl: string = "http://163.172.130.175:8888/"
  
  constructor(private http: HttpClients ) { // , @Inject('identityBaseUrl') private baseUrl: string) {
  }

  changePassword(id: string, password: Password): Observable<any> {
    password.password = IdentityService.encodePassword(password.password);
    return this.http.put(this.baseUrl + '/users/' + id + '/password', password)
      .catch(Error.handleError);
  }

  createUser(user: UserWithPassword): Observable<any> {
    user.password = IdentityService.encodePassword(user.password);
    return this.http.post(this.baseUrl + '/users', user)
      .catch(Error.handleError);
  }

  getUser(id: string): Observable<User> {
    return this.http.get(this.baseUrl + '/users/' + id)
      .catch(Error.handleError);
  }

  changeUserRole(user: string, roleIdentifier: RoleIdentifier): Observable<any> {
    return this.http.put(this.baseUrl + '/users/' + user + '/roleIdentifier', roleIdentifier)
      .catch(Error.handleError);
  }

  listRoles(): Observable<Role[]> {
    return this.http.get(this.baseUrl + '/roles')
      .catch(Error.handleError);
  }

  getRole(id: string): Observable<Role> {
    return this.http.get(this.baseUrl + '/roles/' + id)
      .catch(Error.handleError);
  }

  createRole(role: Role): Observable<any> {
    return this.http.post(this.baseUrl + '/roles', role)
      .catch(Error.handleError);
  }

  changeRole(role: Role): Observable<any> {
    return this.http.put(this.baseUrl + '/roles/' + role.identifier, role)
      .catch(Error.handleError);
  }

  deleteRole(id: String): Observable<any> {
    return this.http.delete(this.baseUrl + '/roles/' + id, {})
      .catch(Error.handleError);
  }

  createPermittableGroup(permittableGroup: PermittableGroup): Observable<PermittableGroup> {
    return this.http.post(this.baseUrl + '/permittablegroups', permittableGroup)
      .catch(Error.handleError);
  }

  getPermittableGroup(id: string): Observable<PermittableGroup> {
    return this.http.get(this.baseUrl + '/permittablegroups/' + id)
      .catch(Error.handleError);
  }

  getPermittableGroups(): Observable<PermittableGroup[]> {
    return this.http.get(this.baseUrl + '/permittablegroups')
      .catch(Error.handleError);
  }
}
