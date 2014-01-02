<?php 
namespace Bestyear\UserBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * When the password changes, the user is redirected to a new page
 */
class PasswordChangedListener implements EventSubscriberInterface {
    private $router;

    public function __construct(UrlGeneratorInterface $router) {
        $this->router = $router;
    }

    public static function getSubscribedEvents() {
        return [
            FOSUserEvents::CHANGE_PASSWORD_SUCCESS => 'onPasswordChangedSuccess',
        ];
    }

    public function onPasswordChangedSuccess(FormEvent $event) {
        $url = $this->router->generate('bestyear_password_changed');
        $event->setResponse(new RedirectResponse($url));
    }
}