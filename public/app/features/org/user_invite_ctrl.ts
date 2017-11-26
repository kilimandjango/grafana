import angular from 'angular';
import _ from 'lodash';

export class UserInviteCtrl {

  /** @ngInject **/
  constructor($scope, backendSrv) {
    $scope.invites = [
      {name: '', email: '', role: 'Editor'},
    ];

    $scope.options = {skipEmails: false};
    $scope.init = function() { };

    $scope.addInvite = function() {
      $scope.invites.push({name: '', email: '', role: 'Editor'});
    };

    $scope.removeInvite = function(invite) {
      $scope.invites = _.without($scope.invites, invite);
    };

    $scope.sendInvites = function() {
      if (!$scope.inviteForm.$valid) { return; }
      $scope.sendSingleInvite(0);
    };

    $scope.sendSingleInvite = function(index) {
      var invite = $scope.invites[index];
      invite.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/invites', invite).finally(function() {
        index += 1;

        if (index === $scope.invites.length) {
          $scope.invitesSent();
          $scope.dismiss();
        } else {
          $scope.sendSingleInvite(index);
        }
      });
    };
  }
}

angular.module('grafana.controllers').controller('UserInviteCtrl', UserInviteCtrl);