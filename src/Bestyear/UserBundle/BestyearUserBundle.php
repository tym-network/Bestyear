<?php

namespace Bestyear\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class BestyearUserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
