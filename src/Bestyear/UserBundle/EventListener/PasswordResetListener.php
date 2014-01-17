<?php 
namespace Bestyear\UserBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * When the password is reset, the user is redirected to a new page
 */
class PasswordResetListener implements EventSubscriberInterface {
    private $router;

    public function __construct(UrlGeneratorInterface $router) {
        $this->router = $router;
    }

    public static function getSubscribedEvents() {
        return array(
            FOSUserEvents::RESETTING_RESET_SUCCESS => 'onPasswordResetSuccess',
        );
    }

    public function onPasswordResetSuccess(FormEvent $event) {
        $url = $this->router->generate('bestyear_password_reset');
        $event->setResponse(new RedirectResponse($url));
    }
}